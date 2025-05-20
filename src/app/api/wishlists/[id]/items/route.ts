import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import type { WishlistItem, Product } from "@/lib/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: wishlistId } = await context.params;
  const itemsSrc = await readJSON<WishlistItem[]>("wishlist_items.json");
  const products = await readJSON<Product[]>("products.json");
  const result = itemsSrc
    .filter((i) => i.wishlistId === wishlistId)
    .map((i) => {
      const p = products.find((p) => p.id === i.productId)!;
      return { ...p, priceAtAdd: i.priceAtAdd };
    });
  return NextResponse.json(result);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: wishlistId } = await context.params;
  const { productId } = await request.json();
  const items = await readJSON<WishlistItem[]>("wishlist_items.json");
  const products = await readJSON<Product[]>("products.json");
  const prod = products.find((p) => p.id === productId);
  if (!prod) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (
    !items.some((i) => i.wishlistId === wishlistId && i.productId === productId)
  ) {
    items.push({ wishlistId, productId, priceAtAdd: prod.price });
    await writeJSON("wishlist_items.json", items);
  }
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: wishlistId } = await context.params;
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  let items = await readJSON<WishlistItem[]>("wishlist_items.json");
  items = items.filter(
    (i) => !(i.wishlistId === wishlistId && i.productId === productId)
  );
  await writeJSON("wishlist_items.json", items);
  return NextResponse.json({ success: true });
}
