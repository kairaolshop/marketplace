"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function PageDashboard() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">disini Page Dashboard</h1>
      <Button onClick={() => signOut({callbackUrl: "/"})}>Keluar</Button>
      
    </main>
  );
}