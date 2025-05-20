# Flexdog Wishlist

**Shareable sneaker wishlists** built with Next.js, TypeScript & Tailwind.

## Features

- Browse products (`/products`)
- Create / rename / delete wishlists
- Add, remove & move items between wishlists
- Bulk “Add all to cart” with optional remove
- Price‐drop & out‐of‐stock badges
- Toggle public/private & copy shareable URL
- Read‐only public view (`/public/[publicId]`)

## Tech Stack

- Next.js App Router (v15)
- TypeScript
- Tailwind CSS
- JSON flat‐file storage

## Getting Started

```bash
git clone <YOUR-REPO-URL>
cd flexdog-wishlist
npm install

# create your env
cp .env.example .env.local
# open .env.local and set:
# NEXT_PUBLIC_BASE_URL=http://localhost:3000

npm run dev
```
