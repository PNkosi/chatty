import { clerk } from "@/lib/clerk";

export default async function getUser(id: string) {
  const user = await clerk.users.getUserList({
    userId: [id],
  });

  return user;
}
