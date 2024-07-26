import React from "react";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  w-full flex-1 max-w-7xl mx-auto  overflow-hidden",
        "h-[90vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <DashboardSidebar />
      <div className="overflow-y-scroll flex-1">{children}</div>
    </div>
  );
};

export default Layout;
