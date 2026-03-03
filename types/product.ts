import { ProductImage } from "@prisma/client";

export interface TransFormedProduct {
    id: string;
    name: string;
    description: string | null;
    price: number;
    categoryId: string;
    discountPrice: string;
    images: ProductImage[];
    isPublished: boolean;
    createdAt: Date;
}