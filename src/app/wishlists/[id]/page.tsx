"use client";

import { useEffect, useState } from "react";
import type { Product, Wishlist } from "@/lib/types";
import { useParams } from "next/navigation";

type WishlistProduct = Product & { priceAtAdd: number };

export default function WishlistDetail() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [allLists, setAllLists] = useState<Wishlist[]>([]);

  useEffect(() => {
    fetch("/api/wishlists")
      .then((r) => r.json())
      .then((all: Wishlist[]) => {
        setWishlist(all.find((w) => w.id === id) || null);
        setAllLists(all);
      });
  }, [id]);

  useEffect(() => {
    fetch(`/api/wishlists/${id}/items`)
      .then((r) => r.json())
      .then(setProducts);
  }, [id]);

  if (!wishlist) {
    return <p className="p-4">Loading…</p>;
  }

  const handleAddAll = async () => {
    if (products.length === 0) return alert("No items to add");
    const remove = confirm(
      "Ponechat položky ve wishlistu? Zrušit = odebrat ze wishlistu."
    );

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds: products.map((p) => p.id) }),
    });

    if (!remove) {
      await Promise.all(
        products.map((p) =>
          fetch(`/api/wishlists/${id}/items?productId=${p.id}`, {
            method: "DELETE",
          })
        )
      );
      setProducts([]);
    }
    alert("Všechny položky byly přidány do košíku!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{wishlist.name}</h1>

      <button
        onClick={handleAddAll}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Přidat vše do košíku
      </button>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="p-3 border rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">${p.price}</p>
              </div>
              <button
                onClick={async () => {
                  // remove from current list
                  await fetch(`/api/wishlists/${id}/items?productId=${p.id}`, {
                    method: "DELETE",
                  });
                  // re-fetch remaining items
                  const updated = await fetch(
                    `/api/wishlists/${id}/items`
                  ).then((r) => r.json());
                  setProducts(updated);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Odstranit
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                className="flex-grow border px-2 py-1 rounded"
                defaultValue=""
                onChange={async (e) => {
                  const targetId = e.currentTarget.value;
                  if (!targetId) return;

                  // 1) Add to target wishlist
                  await fetch(`/api/wishlists/${targetId}/items`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: p.id }),
                  });

                  // 2) Remove from current
                  await fetch(`/api/wishlists/${id}/items?productId=${p.id}`, {
                    method: "DELETE",
                  });

                  // 3) Refresh
                  const remaining = await fetch(
                    `/api/wishlists/${id}/items`
                  ).then((r) => r.json());
                  setProducts(remaining);
                  alert(
                    `Položka přesunuta do "${
                      allLists.find((w) => w.id === targetId)?.name
                    }"`
                  );
                }}
              >
                <option value="" disabled>
                  Přesunout do…
                </option>
                {allLists
                  .filter((w) => w.id !== id)
                  .map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
              </select>
            </div>
          </li>
        ))}

        {products.length === 0 && (
          <li className="text-gray-500">Wishlist je prázdný.</li>
        )}
      </ul>
    </div>
  );
}
