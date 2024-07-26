import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";
import { IconMessage } from "@tabler/icons-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  date,
  header,
  imageURL,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  date: number;
  header?: React.ReactNode;
  imageURL: string;
  id: string;
}) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-slate-950 dark:border-slate-200/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <Image
          src={imageURL}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          <span className="mr-2">Joined: </span>
          {format(new Date(date), "PPP")}
        </div>
        <div className="mt-4">
          <Link href={`/dashboard/chats/${id}`} className="">
            <IconMessage />
          </Link>
        </div>
      </div>
    </div>
  );
};
