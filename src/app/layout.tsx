import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/mode-toggle";
import { Providers } from "./providers";
import { convexClient } from "@/lib/convex";
import { api } from "../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn } = auth();
  let user;

  if (userId === null) redirectToSignIn();
  else {
    user = await convexClient.query(api.users.getUser, { clerkId: userId });
  }

  return (
    <Providers>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="bg-background sticky top-0">
              <div className="max-w-3xl mx-auto flex items-center justify-between h-[10vh] px-6">
                <div className="font-bold flex items-center gap-2">
                  <Image src="/logo.svg" alt="logo" width={30} height={30} />
                  chatty
                </div>

                <div className="md:flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-8">
                    <SignedIn>
                      <Link href={`/${user?.username}/chats`}>chats</Link>
                      <Link href={"#"}>groups</Link>
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
