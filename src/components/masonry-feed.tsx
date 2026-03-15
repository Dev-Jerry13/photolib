import Image from "next/image";
import { Post } from "@/types";

export function MasonryFeed({ items }: { items: Post[] }) {
  return (
    <section className="grid">
      {items.map((post) => (
        <article key={post.id} className="card">
          {post.mediaType === "gif" ? (
            <img src={post.imageUrl} alt={post.title} loading="lazy" />
          ) : (
            <Image src={post.imageUrl} alt={post.title} width={900} height={1200} />
          )}
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              <strong>{post.title}</strong>
              <span className="badge">{post.mediaType}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
