"use client"

import { getProduct, ProductTransformed } from "@/lib/actions/product";
import { useState } from "react";
import ProductList from "./productList";

interface FilterProductProps {
    initialProducts: ProductTransformed[];
    excludeSlug?: string;
}

const LIMIT = 4;

export default function FilterProducts({
    initialProducts, excludeSlug
}: FilterProductProps) {
    const [products, setProducts] = useState<ProductTransformed[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [skip, setSkip] = useState(initialProducts.length);
    const [hasMore, setHashMore] = useState(initialProducts.length === LIMIT);



    const loadProducts = async (isNewFilter = false) => {
        const querySkip = isNewFilter ? 0 : skip;
        setIsLoading(true);
        try {
            const newProducts = await getProduct({
                limit: LIMIT, skip: querySkip, excludeSlug: excludeSlug,
                orderBy: 'createdAt', orderDirection: 'desc'
            });
            if (isNewFilter) {
                setProducts(newProducts);
                setSkip(newProducts.length);
            } else {
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
                setSkip(prevSkip => prevSkip + newProducts.length);
            }
            setHashMore(newProducts.length === LIMIT);
        } catch (error) {
            console.error("gagal memuat produck", error)
        } finally { setIsLoading(false); }
    };

    return (
        <> <div className="space-y-4 py-2">
            <ProductList
                products={products}
                onLoadMore={() => loadProducts()}
                hasMore={hasMore}
                isLoading={isLoading}
            />
            </div>
        </>
    )
}