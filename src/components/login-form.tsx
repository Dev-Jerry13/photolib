"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid credentials or account blocked.");
      setPending(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" autoComplete="email" required />
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        minLength={10}
        required
      />
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Signing in..." : "Secure login"}
      </button>
      {error && <small style={{ color: "#b91c1c" }}>{error}</small>}
    </form>
  );
}
