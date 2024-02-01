import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import LoginClient from "./login-client";

export default async function Login() {
  const session = await getServerAuthSession();
  if (session !== null) {
    redirect("/");
  }
  return (
    <>
      <LoginClient />
    </>
  );
}
