"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setMessage("Upload blocked: verify file type/size and your account status.");
      setPending(false);
      return;
    }

    event.currentTarget.reset();
    setMessage("Uploaded securely.");
    setPending(false);
    router.refresh();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Post title" maxLength={100} required />
      <input name="file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required />
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Uploading..." : "Upload"}
      </button>
      {message && <small>{message}</small>}
    </form>
  );
}
