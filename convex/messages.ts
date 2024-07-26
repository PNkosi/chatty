import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    sender: v.object({
      id: v.string(),
      username: v.string(),
    }),
    receiver: v.object({
      id: v.string(),
      username: v.string(),
    }),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const { sender, receiver, message } = args;

    const messageId = await ctx.db.insert("messages", {
      sender,
      receiver,
      message,
    });

    if (messageId) return { status: "message sent" };
    else return { status: "message not sent" };
  },
});

export const getMessages = query({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
    const { senderId, receiverId } = args;

    const messages = ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("sender.id"), senderId),
            q.eq(q.field("receiver.id"), receiverId)
          ),
          q.and(
            q.eq(q.field("sender.id"), receiverId),
            q.eq(q.field("receiver.id"), senderId)
          )
        )
      )
      .collect();
    console.log(messages);

    return messages;
  },
});
