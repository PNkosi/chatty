import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsertUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    username: v.string(),
    image: v.string(),
  },

  handler: async (ctx, args) => {
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (userRecord === null) {
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        username: args.username,
        email: args.email,
        image: args.image,
      });
    } else {
      await ctx.db.patch(userRecord._id, { ...args });
    }
  },
});

export const getUser = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const { clerkId } = args;
    const userRecord = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("clerkId", clerkId))
      .unique();

    return userRecord;
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});
