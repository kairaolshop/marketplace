"use client";

import { signOut } from "next-auth/react";

export default function PageName() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">ini lah page</h1>
      <button 
      className="bg-red-500 p-2"
      onClick={() => signOut({callbackUrl:"/login"})}> keluar</button>
      
    </main>
  );
}