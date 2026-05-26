"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogInIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { authClient } from "../../lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between p-5 md:px-10">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={26.14}
          style={{ height: "auto" }}
        />
      </Link>

      <div className="flex items-center">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon" />}>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => authClient.signOut()}
                    >
                      <LogInIcon className="rotate-180" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá, faça seu login.</h2>
                  <Button size="icon" variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
