import { getServerAuthSession } from "@/server/auth";
import NavClient from "./nav-client";

export default async function Nav() {
  const session = await getServerAuthSession();

  return <NavClient session={session} />;
}
