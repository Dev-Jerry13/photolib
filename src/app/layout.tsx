import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "PhotoLib - Pinterest style media board",
  description: "Secure photo and GIF sharing board with masonry layout"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container" style={{ paddingTop: "1rem" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
