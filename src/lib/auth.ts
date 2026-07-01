export interface AuthUser {
  email: string;
  plan: string;
  userId: string;
  name?: string;
  picture?: string;
  subtitleLang?: string;
  /** 만료일(ISO 문자열). 백엔드가 /users/me 응답의 plan_expires_at으로 내려준다. */
  planExpiresAt?: string;
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

export async function loginWithGoogle(
  idToken: string,
  email: string,
): Promise<{ user: AuthUser; isNewUser: boolean }> {
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

  // is_new_user: 백엔드가 이번 로그인이 '최초 가입'일 때만 true로 내려준다. 없으면 신규로 보지 않음.
  const data = (await res.json()) as {
    access_token: string;
    plan: string;
    user_id: string;
    is_new_user?: boolean;
  };
  const decoded = decodeGoogleIdToken(idToken);
  const user: AuthUser = {
    email,
    plan: data.plan,
    userId: data.user_id,
    name: decoded?.name,
    picture: decoded?.picture,
  };
  saveAuth(data.access_token, user);
  return { user, isNewUser: data.is_new_user === true };
}

/**
 * 테스터(심사자) 전용 로그인. Google 계정 없이 이름/비밀번호로 로그인한다.
 * CWS 심사자가 디스코드 화이트리스트 절차 없이 기능을 검토할 수 있도록 제공.
 * 백엔드 연결은 개발자가 `/auth/tester` 엔드포인트를 구현하면 그대로 동작한다.
 */
export async function loginAsTester(
  username: string,
  password: string,
): Promise<{ user: AuthUser; isNewUser: boolean }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${apiUrl}/auth/tester`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    // 401 등 자격 증명 오류는 사용자에게 명확한 메시지로 노출
    throw new Error("Invalid tester name or password.");
  }

  const data = (await res.json()) as {
    access_token: string;
    plan: string;
    user_id: string;
    email?: string;
    name?: string;
    is_new_user?: boolean;
  };
  const user: AuthUser = {
    email: data.email ?? username,
    plan: data.plan,
    userId: data.user_id,
    name: data.name,
  };
  saveAuth(data.access_token, user);
  return { user, isNewUser: data.is_new_user === true };
}

/** Google ID 토큰(JWT)에서 페이로드를 디코딩해 프로필 정보를 추출합니다. */
export function decodeGoogleIdToken(idToken: string): { email: string; name?: string; picture?: string } | null {
  try {
    const payload = idToken.split(".")[1];
    const binaryStr = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
    const decoded = JSON.parse(new TextDecoder().decode(bytes));
    return {
      email: decoded.email as string,
      name: decoded.name as string | undefined,
      picture: decoded.picture as string | undefined,
    };
  } catch {
    return null;
  }
}
