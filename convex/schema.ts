import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
    email: v.optional(v.string()),
    image: v.string(),
  }).index("by_user_id", ["clerkId"]),
});
