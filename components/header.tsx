"use client";


import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";

interface Category {
    id: string; name: string; slug: string;
}
interface HeaderProps {
    categories?: Category[]; session: Session | null;
}

export default function Header({ session }: HeaderProps) {
    const isLoggedIn = !!session;
    const role = session?.user?.role || "Guest";

    return (
        <header className="sticky top-0 z-50 bg-white shadow mb-4 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60">
            <div className="flex-row items-center items-center flex justify-between p-4">
                <div className="flex items-center space-x-4 ">
                    <Link href="/" className=" flex gap-2 items-center">
                        <Image
                            src="/images/dhalisa copy.png"
                            alt="logoToko"
                            width={30}
                            height={30}
                            className="w-8 h-auto" /> Dhalisa.id</Link>
                </div>


                <div className="flex items-center space-x-4 text-muted-foreground hover:text-primary cursor-pointer">
                    Dashboard Admin
                </div>
                <div className=" flex items-center gap-4">
                    {role === "ADMIN" && <Link href="/Dashboard"></Link>}
                    {role === "USER" && <Link href="/favorites"></Link>}
                    {isLoggedIn ? (
                        <Avatar>
                            <AvatarImage src={session?.user?.image || ""} />
                            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                    ) : (<Button asChild><Link href="/login" /></Button>)}
                </div>
            </div>


        </header>
    );
}