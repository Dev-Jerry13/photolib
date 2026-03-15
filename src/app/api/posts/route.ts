import { NextResponse } from "next/server";
import { posts } from "@/lib/data";

export async function GET() {
  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, max-age=30"
    }
  });
}
