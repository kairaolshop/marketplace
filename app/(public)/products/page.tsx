import { getAllProducts } from "@/lib/actions/product";
import Image from "next/image";

export default async function ProductPage() {
  const products = await getAllProducts();
  if (products.length === 0) {
    return <p className=" text-center py-10">Belum ada inya</p>
  }
  return (
    <div className="container mx-auto py-8 bg-stone-600">
      <h1 className=" text-3xl text-center font-bold mb-6">Produk kami
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((i) => (
          <div key={i.id}
            className="border rounded-lg overflow-hidden shadow-sw bg-white">
            {i.images[0] && (
              <div className="relative h-100 mb-8">
                <Image
                  src={i.images[0].url}
                  alt={i.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
            )}
            <div className="p-4">
              <h2 className=" text-xl font-semibold mt-1">{i.name}</h2>
              <p className="">Rp{i.price.toLocaleString()}
                {i.discountPrice && (
                  <span className="ml-2 text-red-500 line-trough">Rp{i.discountPrice.toLocaleString()}</span>
                )}
              </p>
              <p className="text-sm text-gary-500 mt-2">{i.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}