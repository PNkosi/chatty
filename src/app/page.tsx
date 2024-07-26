import Hero from "@/components/hero";
import Image from "next/image";
import UsersList from "./dashboard/_components/usersList";

export default function Home() {
  return (
    <main>
      <Hero />

      <UsersList />
    </main>
  );
}
