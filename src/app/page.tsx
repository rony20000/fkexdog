export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-8">
      <h1 className="text-4xl font-extrabold">Welcome to Flexdog</h1>
      <p className="text-red-500 ">
        Your modern shareable sneaker-wishlist app
      </p>
      <div className="flex gap-6">
        <a
          href="/products"
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Browse Products
        </a>
        <a
          href="/wishlists"
          className="px-8 py-4 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          My Wishlists
        </a>
      </div>
    </div>
  );
}
