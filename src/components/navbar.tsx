"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data } = useSession();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" style={{ fontWeight: 900, letterSpacing: 0.3 }}>
          PhotoLib
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          {data?.user ? (
            <>
              {data.user.role === "admin" && (
                <Link href="/admin" className="btn btn-dark">
                  Admin
                </Link>
              )}
              <button className="btn" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
