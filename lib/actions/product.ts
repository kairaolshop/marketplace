import { Bitcount_Prop_Double_Ink } from "next/font/google";
import { prisma } from "../prisma";

export async function getAllProducts() {
    try {
        const products = await prisma.product.findMany({
            where: { isPublished: true },
            include: {
                images: {
                    orderBy: { order: "asc" }
                }, category: true,
            }, orderBy: { createdAt: "desc" }
        });
        return products;
    } catch (error) {
        console.error('Error ambil semua produk', error);
        return [];
    }
}



export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findFirst({
            where: { slug },
            include: {
                images: {
                    orderBy: { order: 'asc' }
                },
                category: true,
                reviews: true,
            },
        });
        if (!product) return null;
        return product;
    } catch (error) {
        console.error('Error ambil produk slug', error);
        return null;
    }
}