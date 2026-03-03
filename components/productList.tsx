"use client"

import { ProductTransformed } from "@/lib/actions/product"
import ProductCard from "./producCard";
import { Button } from "./ui/button";

interface ProductListProps {
    products: ProductTransformed[];
    onLoadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}
export default function ProductList({
    products, onLoadMore, hasMore, isLoading
}: ProductListProps) {
    return (
        <>
            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 ">
                    {products.map((i) => (
                        <ProductCard
                            key={i.slug} data={i} />
                    ))}
                </div>
            ) : (
                <div className=" bg-gray-100 p-4 text-center">Tidak ada produk terbaru saata ini</div>
            )}
            {hasMore && (
                <div className="flex justify-center">
                    <Button onClick={onLoadMore}
                        disabled={isLoading}
                        className="text-sm bg-orange-500 p-2">{isLoading ? "Memuat..." : "Tampilkan yang lain"}
                        </Button>
                </div>
            )}

        </>
    );
}