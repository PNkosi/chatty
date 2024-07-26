import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    email: v.optional(v.string()),
    image: v.string(),
  }).index("by_user_id", ["clerkId"]),

  messages: defineTable({
    sender: v.object({
      id: v.string(),
      username: v.string(),
    }),
    receiver: v.object({
      id: v.string(),
      username: v.string(),
    }),
    message: v.string(),
  }).index("by_sender_receiver", ["sender.id", "receiver.id"]),
});
