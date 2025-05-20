import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/data";
import type { Wishlist } from "@/lib/types";
import { v4 as uuid } from "uuid";

const USER_ID = "user1";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const all = await readJSON<Wishlist[]>("wishlists.json");
  const idx = all.findIndex((w) => w.id === params.id && w.userId === USER_ID);
  if (idx === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  if (body.name !== undefined) all[idx].name = body.name;
  if (body.isPublic !== undefined) {
    all[idx].isPublic = body.isPublic;
    all[idx].publicId = body.isPublic ? uuid() : undefined;
  }
  await writeJSON("wishlists.json", all);
  return NextResponse.json(all[idx]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const all = await readJSON<Wishlist[]>("wishlists.json");
  const filtered = all.filter(
    (w) => !(w.id === params.id && w.userId === USER_ID)
  );
  if (filtered.length === all.length)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  await writeJSON("wishlists.json", filtered);
  return NextResponse.json({ success: true });
}
