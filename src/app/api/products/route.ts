import { NextResponse } from "next/server";
import { readJSON } from "@/lib/data";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = await readJSON<Product[]>("products.json");

  return NextResponse.json(products);
}
