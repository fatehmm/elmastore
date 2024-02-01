"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserProfile } from "@/components/user-profile";
import { links } from "@/config/nav";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavClient({ session }: { session: Session | null }) {
  const path = usePathname();
  const user = session?.user;

  return (
    <>
      <Drawer direction="left">
        <div className="flex justify-between border px-4 py-4">
          <DrawerTrigger className="text-xl sm:hidden">Store</DrawerTrigger>
          <span className="hidden text-2xl sm:block">Store</span>
          <div>
            {session ? (
              <>
                <UserProfile
                  user={{
                    email: user?.email,
                    image: user?.image,
                    name: user?.name,
                  }}
                />
              </>
            ) : (
              <Button variant="secondary" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
        <DrawerContent className="top-0 mt-0 w-[80%] rounded-t-[0px]">
          <DrawerHeader>
            <DrawerTitle>Store</DrawerTitle>
          </DrawerHeader>
          <div className="w-full space-y-2 px-4">
            {links.map((val, i) => {
              return (
                <Button
                  key={i}
                  className="w-full"
                  variant={path == val.href ? "default" : "ghost"}
                  asChild
                >
                  <Link href={val.href}>{val.name}</Link>
                </Button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
