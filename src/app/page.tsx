import Hero from "@/components/hero";
import Image from "next/image";
import UsersList from "./dashboard/_components/usersList";

export default function Home() {
  return (
    <main className="space-y-8">
      <Hero />
      <UsersList />
    </main>
  );
}
