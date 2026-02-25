
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST (request: Request){
    try{
        const {name, email, password} =  await request.json();

        if (!email || !password || !name) {
            return NextResponse.json({
                error: "Nama, email, password diperlukan"},{status: 400});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            return NextResponse.json(
                {error: "Email sudah terdaptar"},
                {status: 400}
            );
        }

        const hashedPassword =  await bcrypt.hash(password, 10);
        const user =  await prisma.user.create({
            data: {name, email, password: hashedPassword, role:"USER"}
        });

        return NextResponse.json({
            message: "Akun berhasil di daftarkan", user: {id: user.id, email: user.email, name: user.name}
        },{status:201});
    } catch (error){
        console.error("SignUp error", error);
        return NextResponse.json(
            {error: "Gagal mendaftar, coba lagi nanti"},
            {status:500}
        );
    }
}