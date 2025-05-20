"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Wishlist } from "@/lib/types";

export default function WishlistsPage() {
  const [lists, setLists] = useState<Wishlist[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/wishlists")
      .then((r) => r.json())
      .then(setLists);
  }, []);

  async function createList() {
    if (!newName.trim()) return;
    const res = await fetch("/api/wishlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    const created: Wishlist = await res.json();
    setLists([created, ...lists]);
    setNewName("");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlists</h1>

      <div className="mb-6 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New wishlist name"
          className="border px-2 py-1 rounded flex-grow"
        />
        <button
          onClick={createList}
          className="px-4 py-1 bg-green-500 text-white rounded"
        >
          Create
        </button>
      </div>

      <ul className="space-y-2">
        {lists.map((w) => (
          <li key={w.id}>
            <Link
              href={`/wishlists/${w.id}`}
              className="text-blue-600 hover:underline"
            >
              {w.name}
            </Link>
          </li>
        ))}
        {lists.length === 0 && (
          <li className="text-gray-500">You have no wishlists yet.</li>
        )}
      </ul>
    </div>
  );
}
