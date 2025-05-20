"use client";
import { useEffect, useState } from "react";
import type { Product, Wishlist } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [selectedList, setSelectedList] = useState<string>("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    fetch("/api/wishlists")
      .then((r) => r.json())
      .then((lists: Wishlist[]) => {
        setWishlists(lists);
        if (lists[0]) setSelectedList(lists[0].id);
      });
  }, []);

  function addToWishlist(productId: string) {
    if (!selectedList) return;
    fetch(`/api/wishlists/${selectedList}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).then(() => {
      alert("Added!");
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="mb-4">
        <label className="mr-2">Choose wishlist:</label>
        <select
          className="border px-2 py-1 rounded"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
        >
          {wishlists.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <li
            key={p.id}
            className="p-4 border rounded-lg flex flex-col justify-between"
          >
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>
            <button
              onClick={() => addToWishlist(p.id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add to Wishlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
