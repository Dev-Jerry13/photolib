import { getServerSession } from "next-auth";
import { MasonryFeed } from "@/components/masonry-feed";
import { UploadForm } from "@/components/upload-form";
import { authOptions } from "@/lib/auth";
import { posts } from "@/lib/data";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section
        className="panel"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", alignItems: "start" }}
      >
        <div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.8rem" }}>Discover photos & GIFs</h1>
          <p style={{ margin: 0, color: "#4b5563" }}>
            Public feed is open for everyone. Login is required to upload, save, or moderate content.
          </p>
        </div>
        <div className="panel" style={{ background: "#f8fafc" }}>
          {session?.user ? (
            <UploadForm />
          ) : (
            <p style={{ margin: 0, color: "#374151" }}>Sign in to upload content securely.</p>
          )}
        </div>
      </section>

      <MasonryFeed items={posts} />
    </>
  );
}
