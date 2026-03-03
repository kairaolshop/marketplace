"use client";

import { ProductTransformed } from "@/lib/actions/product";
import { cn } from "@/lib/utils copy";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  data: ProductTransformed
}
const ProductCard: React.FC<ProductCardProps> = ({ data, }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleProductClick = () => {
    setIsNavigating(true); router.push(`/product/${data?.slug}`);
  };
  const PlacaHolderImg = "/product-imag-PlacaHolderImg.svg";
  const altText = data.images && data.images.length > 0 ? "Gambar product" : PlacaHolderImg;

  return (
    <div className={cn(
      "bg-white group rounded-sm border overflow-hidden shadow-sm flex flex-col ",
      isNavigating && "opacity-50 pointer-event-none"
    )}>
      <div onClick={handleProductClick}
        className="flex-grow cursor-pointer relative">
        <div className="aspect-square bg-gray-100 relative w-full overflow-hidden">
          <Image
            alt={altText || 'Gambar'}
            src={data?.images?.[0].url || PlacaHolderImg}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority />
        </div>{isNavigating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-5 h-5 border-2 border-white border-t-transfarent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <h3 className="text-sm px-2 font-semibold line-clamp-1">{data.name}
        <p className="text-xs">{data.category ? data.category.name : 'gada kategory'}</p></h3>
        <div className="flex items-center px-2 mt-1 text-xs">{Array.from({length: 5}).map ((_, i) => (
          <Star key={i}
          className={cn("w-3 h-3 md:w-4 h-4", i < Math.floor(data.avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 ")} />
        ))}</div>
        <div className="flex mb-2 py-2 flex-col px-2 text-xs">{data.price && (
          <span className="text-gray-500 line-through">Rp{data.price}</span>          
        )}<span className="text-red-600">RP{data.discountPrice}</span></div>

    </div>
  )
}
export default ProductCard