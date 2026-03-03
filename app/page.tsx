import FilterProducts from "@/components/Filterproduct";
import Header from "@/components/header"
import { getProduct } from "@/lib/actions/product";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function HomePage() {
  const session =  await getServerSession(authOptions);
  const initialProducts =  await getProduct({
    limit: 4, skip:0, orderBy: 'createdAt', orderDirection:'desc'
  });
  const userRole = session?.user?.role || 'Guest'
  return (
    <>
    <Header session={session}/>
    <main className="max-w-7xl mx-auto min-h-screen p-2">
      
      <div className=" items-center px-2 border shadow rounded-lg">
        <h1 className="p-4 text-xl font-bold text-center ">Produk unggulan</h1>
        <Suspense fallback={
          <p>Memuat products...</p>
        }>
        <FilterProducts
        initialProducts={initialProducts}/>
        </Suspense>
      </div>
    </main>
    </>
  )
}