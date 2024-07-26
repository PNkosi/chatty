"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHome,
  IconLayout,
  IconLoader,
  IconMessage,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { convexClient } from "@/lib/convex";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

const Loading = () => (
  <div className="h-[90vh] flex flex-col items-center justify-center gap-8">
    <IconLoader className="animate-spin" />
    <p>loading</p>
  </div>
);

export default function DashboardSidebar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);

  // if ()

  const links = [
    {
      label: "Dashboard",
      href: `/dashboard`,
      icon: <IconLayout className="text-slate-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="text-slate-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "chats",
      href: "#",
      icon: <IconMessage className="text-slate-200 h-5 w-5 flex-shrink-0" />,
    },
  ];
  return (
    <>
      {isLoaded && user ? (
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="font-bold flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={30} height={30} />
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: user.username!,
                  href: "#",
                  icon: (
                    <Image
                      src={user.imageUrl}
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
              <SignOutButton>
                <div className="flex items-center justify-start gap-2  group/sidebar py-2 cursor-pointer">
                  <IconArrowLeft className="text-slate-200 h-5 w-5 flex-shrink-0" />{" "}
                  {open ? (
                    <span className="text-slate-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
                      Logout
                    </span>
                  ) : null}
                </div>
              </SignOutButton>
            </div>
          </SidebarBody>
        </Sidebar>
      ) : (
        <></>
      )}
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
