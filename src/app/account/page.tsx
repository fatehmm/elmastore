import React from "react";
import AccountClient from "./account-client";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const AccountPage: React.FC = async () => {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    redirect("/auth/login");
  }
  return (
    <div className="px-6 py-12 sm:px-24 ">
      <AccountClient session={session} />
    </div>
  );
};

export default AccountPage;
