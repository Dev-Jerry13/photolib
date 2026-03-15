import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="panel" style={{ maxWidth: 420, margin: "2.5rem auto" }}>
      <h1 style={{ marginTop: 0 }}>Login</h1>
      <p style={{ color: "#4b5563" }}>Demo accounts: admin@photolib.dev / Admin@12345</p>
      <p style={{ color: "#4b5563" }}>user@photolib.dev / User@12345</p>
      <LoginForm />
    </div>
  );
}
