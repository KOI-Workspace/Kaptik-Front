import type { Metadata } from "next";
import AccountView from "@/components/AccountView";

export const metadata: Metadata = {
  title: "Account — Kaptik",
  description: "Manage your Kaptik account.",
};

export default function Account() {
  return <AccountView />;
}
