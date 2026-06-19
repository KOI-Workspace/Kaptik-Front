import type { Metadata } from "next";
import LoginView from "@/components/LoginView";

export const metadata: Metadata = {
  title: "Sign in — Kaptik",
  description: "Sign in to your Kaptik account.",
};

export default function Login() {
  return <LoginView />;
}
