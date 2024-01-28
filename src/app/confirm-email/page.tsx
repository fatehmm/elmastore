"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ConfirmEmail() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  return (
    <>
      <h1>Confirm your Login</h1>
      <p>Press the button below to log in into your account.</p>
      <Button asChild>
        <Link
          href={link ? `${link}&token=${token}&email=${email}` : "not-found"}
        >
          Log in
        </Link>
      </Button>
    </>
  );
}
