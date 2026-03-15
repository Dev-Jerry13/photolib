export function assertAuthEnv() {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Missing NEXTAUTH_SECRET. Add it to your environment.");
  }
}
