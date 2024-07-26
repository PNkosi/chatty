"use client";

import { User } from "@clerk/nextjs/server";
import { IconSend } from "@tabler/icons-react";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [data, setData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

  useEffect(() => {
    fetch(`/api/clerk/user?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [params.id]);

  const send = useMutation(api.messages.sendMessage);

  const messages = useQuery(api.messages.getMessages, {
    senderId: user?.id!,
    receiverId: params.id,
  });

  const sendMessage = () => {
    send({
      sender: {
        id: user?.id!,
        username: user?.username!,
      },
      receiver: {
        id: data?.id!,
        username: data?.username!,
      },
      message,
    });
    setMessage("");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No users</p>;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <header className="bg-[#6956FB] text-white h-[15vh] lg:h-[calc(90vh-32px)] px-4 lg:py-4 flex items-center lg:items-start flex-row md:flex-col gap-4 rounded-md md:w-1/4">
        <Image
          className="border-2 lg:border-4 border-white rounded-full w-10 h-10 lg:w-32 lg:h-32"
          src={data.imageUrl}
          alt="avatar"
          height={100}
          width={100}
        />
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold">
            {data.firstName} {data.lastName}
          </h3>
          <h5>{data.username}</h5>
        </div>
      </header>
      <section className="relative h-[calc(90vh-2.5rem-15vh-32px-16px)] lg:h-[calc(90vh-32px)] lg:w-3/4 bg-background rounded-md p-4">
        {/* Messages */}
        <div className="flex flex-col gap-4 h-[calc(90vh-2.5rem-25vh-32px-16px-32px)] lg:h-[calc(65vh)] overflow-y-scroll hide-scrollbar mb-4">
          {messages?.map((msg) => {
            const isUserSender = msg.sender.id === user?.id;
            const avatar = isUserSender ? user?.imageUrl : data?.imageUrl;
            const messageClass = isUserSender
              ? "bg-[#6956FB] self-end"
              : "bg-[#E0E0E0] dark:bg-slate-800 self-start";
            const alignmentClass = isUserSender
              ? "flex-row-reverse"
              : "flex-row";

            return (
              <div
                key={msg._id}
                className={`flex ${alignmentClass} items-start gap-2`}
              >
                <Image
                  className="w-8 h-8 rounded-full"
                  src={avatar!}
                  alt="user avatar"
                  width={32}
                  height={32}
                />
                <p
                  className={`p-4 rounded-md w-fit text-wrap max-w-2xl break-words ${messageClass}`}
                >
                  {msg.message}
                </p>
              </div>
            );
          })}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </div>
        <div className="absolute bottom-4 w-[calc(100%-32px)]">
          <div className="border-2 border-[#6956FB] rounded-md flex items-center pl-4">
            <input
              className="flex-1 p-4 outline-none focus:border-none focus:outline-none border-none bg-background"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="message..."
            />
            <button
              type="button"
              className="p-4 bg-[#6956FB] text-white rounded-l-md"
              onClick={sendMessage}
            >
              <IconSend />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
