export interface AuthUser {
  email: string;
  plan: string;
  userId: string;
  name?: string;
  picture?: string;
  subtitleLang?: string;
}

const TOKEN_COOKIE = "kaptik_token";
const USER_KEY = "kaptik_user";

export function saveAuth(token: string, user: AuthUser): void {
  const maxAge = 60 * 60 * 24 * 7; // 7일
  document.cookie = `${TOKEN_COOKIE}=${token}; max-age=${maxAge}; path=/; SameSite=Strict`;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuth(): { token: string; user: AuthUser } | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_COOKIE}=([^;]*)`));
  const token = match ? decodeURIComponent(match[1]) : null;
  const userRaw = localStorage.getItem(USER_KEY);
  if (!token || !userRaw) return null;
  try {
    return { token, user: JSON.parse(userRaw) as AuthUser };
  } catch {
    return null;
  }
}

export function clearAuth(): void {
  document.cookie = `${TOKEN_COOKIE}=; max-age=0; path=/; SameSite=Strict`;
  localStorage.removeItem(USER_KEY);
}

export async function loginWithGoogle(idToken: string, email: string): Promise<AuthUser> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${apiUrl}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "로그인에 실패했습니다.");
  }

  const data = (await res.json()) as { access_token: string; plan: string; user_id: string };
  const decoded = decodeGoogleIdToken(idToken);
  const user: AuthUser = {
    email,
    plan: data.plan,
    userId: data.user_id,
    name: decoded?.name,
    picture: decoded?.picture,
  };
  saveAuth(data.access_token, user);
  return user;
}

/** Google ID 토큰(JWT)에서 페이로드를 디코딩해 프로필 정보를 추출합니다. */
export function decodeGoogleIdToken(idToken: string): { email: string; name?: string; picture?: string } | null {
  try {
    const payload = idToken.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return {
      email: decoded.email as string,
      name: decoded.name as string | undefined,
      picture: decoded.picture as string | undefined,
    };
  } catch {
    return null;
  }
}
