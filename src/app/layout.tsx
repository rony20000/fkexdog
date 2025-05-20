import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flexdog Wishlist",
  description: "Shareable sneaker wishlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        suppressHydrationWarning
        className="bg-gray-50 text-gray-800 antialiased"
      >
        <header className="sticky top-0 bg-white shadow-sm z-10">
          <div
            suppressHydrationWarning
            className="max-w-5xl mx-auto flex items-center justify-between p-4"
          >
            <Link href="/" className="text-2xl font-extrabold">
              Flexdog
            </Link>
            <nav className="space-x-6 text-gray-600">
              <Link href="/products" className="hover:text-gray-900 transition">
                Products
              </Link>
              <Link
                href="/wishlists"
                className="hover:text-gray-900 transition"
              >
                My Wishlists
              </Link>
            </nav>
          </div>
        </header>

        <main suppressHydrationWarning className="max-w-5xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
