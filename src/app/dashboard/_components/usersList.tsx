"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

type UsersData = {
  data: User[];
  totalCount: number;
};

export default function UsersList() {
  const [data, setData] = useState<UsersData>();
  const [isLoading, setisLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetch("/api/clerk/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setisLoading(false);
      });
  }, []);

  if (isLoading) return <p>loading...</p>;
  if (!data) return <p>No users</p>;

  const usersWithoutCurrentUser = data.data.filter(
    (item) => item.id !== user?.id
  );

  const items = usersWithoutCurrentUser.map((user) => {
    return {
      clerkId: user.id,
      username: user.username,
      firtName: user.firstName,
      lastName: user.lastName,
      image: user.imageUrl,
      header: <Header firstName={user.firstName!} lastName={user.lastName!} />,
      joinedAt: user.createdAt,
    };
  });

  return (
    <BentoGrid className="flex-1">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          id={item.clerkId}
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

type HeaderProps = {
  firstName: string;
  lastName: string;
};
const Header = ({ firstName, lastName }: HeaderProps) => (
  <div className="flex items-center justify-center flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#6956FB]">
    <h3 className="text-2xl font-bold">
      {firstName} {lastName}
    </h3>
  </div>
);
