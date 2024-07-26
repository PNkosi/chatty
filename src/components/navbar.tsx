"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ModeToggle from "./mode-toggle";
import { IconLayout } from "@tabler/icons-react";

type Props = {};

const Navabr = (props: Props) => {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <nav className="bg-background sticky top-0">
      <div className="max-w-3xl mx-auto flex items-center justify-between h-[10vh] px-6">
        <div className="font-bold flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          chatty
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8">
            <SignedIn>
              <Link href={"/dashboard"}>
                <IconLayout className="md:hidden" />
                <span className="hidden md:inline-block">Dashboard</span>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">Login</SignInButton>
              <SignUpButton mode="modal">Register</SignUpButton>
            </SignedOut>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navabr;
