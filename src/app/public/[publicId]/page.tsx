import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { WishlistWithItems, Product } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: { publicId: string };
}): Promise<Metadata> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/public/${params.publicId}`);
  if (!res.ok) return {};
  const data: WishlistWithItems = await res.json();
  return { title: data.name };
}

export default async function PublicWishlistPage({
  params,
}: {
  params: { publicId: string };
}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/public/${params.publicId}`);
  if (!res.ok) return notFound();
  const data: WishlistWithItems = await res.json();
  const { name, description, items } = data;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-2">{name}</h1>
        {description && <p className="text-gray-600 mb-6">{description}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((p: Product) => (
            <div
              key={p.id}
              className="border rounded-xl shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="mt-1 text-gray-500">${p.price}</p>
              </div>
              <span className="mt-4 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm self-start">
                In Stock: {p.inStock ? "✅" : "❌"}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              No items in this wishlist yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
