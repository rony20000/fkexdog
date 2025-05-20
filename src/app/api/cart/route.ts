import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import type { CartItem } from "@/lib/types";

export async function POST(request: Request) {
  const { productIds }: { productIds: string[] } = await request.json();

  const cart = await readJSON<CartItem[]>("cart.json");

  for (const pid of productIds) {
    const existing = cart.find((item) => item.productId === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: pid, quantity: 1 });
    }
  }

  await writeJSON("cart.json", cart);
  return NextResponse.json({ success: true });
}
