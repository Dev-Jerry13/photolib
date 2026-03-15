import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { posts, users } from "@/lib/data";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
      <section className="panel">
        <h1 style={{ marginTop: 0 }}>Admin panel</h1>
        <p style={{ color: "#4b5563" }}>
          Security policy: admins can inspect users and media inventory. Suspended users cannot authenticate.
        </p>
      </section>

      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.email} — {user.role} {user.suspended ? "(suspended)" : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Posts ({posts.length})</h2>
        <p style={{ margin: 0 }}>Total photos/GIFs currently published.</p>
      </section>
    </div>
  );
}
