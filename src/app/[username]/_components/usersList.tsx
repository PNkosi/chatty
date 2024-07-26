"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function UsersList() {
  const users = useQuery(api.users.getAllUsers);

  if (!users) {
    return <p>loading</p>;
  }

  const items = users.map((user) => {
    const date = new Date(user._creationTime);
    return {
      id: user._id,
      clerkId: user.clerkId,
      username: user.username,
      image: user.image,
      header: <Skeleton />,
      joinedAt: user._creationTime,
    };
  });

  return (
    <BentoGrid className="flex-1">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.username}
          date={item.joinedAt}
          header={item.header}
          imageURL={item.image}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
