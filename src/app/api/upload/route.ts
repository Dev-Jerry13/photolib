import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { posts } from "@/lib/data";

const allowedMime = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxSize = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.suspended) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "Untitled").slice(0, 100);

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!allowedMime.has(file.type) || file.size > maxSize) {
    return NextResponse.json({ error: "Invalid file type or size" }, { status: 400 });
  }

  const mediaType = file.type === "image/gif" ? "gif" : "photo";

  posts.unshift({
    id: randomUUID(),
    title,
    imageUrl: URL.createObjectURL(file),
    mediaType,
    createdBy: session.user.id,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ ok: true });
}
