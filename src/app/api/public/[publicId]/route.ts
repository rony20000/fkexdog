import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { Wishlist, WishlistItem, Product } from "@/lib/types";

export async function GET(
  _: Request,
  { params }: { params: { publicId: string } }
) {
  const { publicId } = params;
  const wishlists = await readJSON<Wishlist[]>("wishlists.json");
  const list = wishlists.find((w) => w.publicId === publicId && w.isPublic);
  if (!list) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const allItems = await readJSON<WishlistItem[]>("wishlist_items.json");
  const productIds = allItems
    .filter((i) => i.wishlistId === list.id)
    .map((i) => i.productId);
  const products = await readJSON<Product[]>("products.json");
  const items = products.filter((p) => productIds.includes(p.id));

  return NextResponse.json({ ...list, items });
}
