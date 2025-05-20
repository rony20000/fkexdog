import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import type { Wishlist } from "@/lib/types";

const USER_ID = "user1";

export async function GET() {
  const all = await readJSON<Wishlist[]>("wishlists.json");
  const mine = all.filter((w) => w.userId === USER_ID);
  return NextResponse.json(mine);
}

export async function POST(request: Request) {
  const { name, description } = await request.json();
  const newList: Wishlist = {
    id: crypto.randomUUID(),
    userId: USER_ID,
    name,
    description,
    isPublic: false,
  };

  const all = await readJSON<Wishlist[]>("wishlists.json");
  all.push(newList);

  await writeJSON("wishlists.json", all);

  return NextResponse.json(newList, { status: 201 });
}
