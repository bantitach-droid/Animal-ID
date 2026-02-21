# 🐾 Animal ID — Pet ID Card Generator

A modern web application for creating beautiful digital ID cards for your beloved pets (cats & dogs). Each card includes a QR code linking to a public profile page, making it easy for anyone who finds your lost pet to contact you.

## ✨ Features

- **Authentication** — Sign up and sign in with email & password
- **Pet Dashboard** — View, edit, and delete all your pet cards in "My Collection"
- **Interactive Card Wizard** — Split-screen form + live preview that updates in real-time as you type
- **Multiple Card Templates** — Minimal, Cartoon, and Official ID styles
- **QR Code Generation** — Every card automatically gets a unique QR code
- **Public Pet Profile** — Scannable QR code links to a public profile with a "Call Owner" button
- **Card Export** — Download high-resolution PNG images of your pet's ID card
- **Mobile-First Design** — Responsive UI with sticky card preview on mobile

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite via Prisma ORM (easily switchable to PostgreSQL)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **QR Code**: qrcode.react
- **Card Image Export**: html2canvas

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bantitach-droid/Animal-ID.git
cd Animal-ID

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client & push database schema
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth handler
│   │   │   └── register/route.ts         # User registration
│   │   └── pets/
│   │       ├── route.ts                  # CRUD: list & create pets
│   │       └── [id]/route.ts             # CRUD: get, update, delete pet
│   ├── auth/
│   │   ├── signin/page.tsx               # Sign in page
│   │   └── signup/page.tsx               # Sign up page
│   ├── create/page.tsx                   # Card wizard with live preview
│   ├── dashboard/page.tsx                # Pet collection dashboard
│   ├── pet/[id]/
│   │   ├── page.tsx                      # Public pet profile (server)
│   │   └── PetProfileClient.tsx          # Public pet profile (client)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                          # Landing page
├── components/
│   ├── CardPreview.tsx                   # Live ID card preview with QR
│   ├── Navbar.tsx                        # Navigation bar
│   ├── PetForm.tsx                       # Pet data input form
│   └── Providers.tsx                     # NextAuth session provider
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── prisma.ts                         # Prisma client singleton
│   └── templates.ts                      # Card template definitions
prisma/
└── schema.prisma                         # Database schema
```

## 📊 Database Schema

- **User** — id, name, email, password, phone
- **Pet** — id, userId, name, species, breed, gender, age, weight, birthday, color, features, healthInfo, imageUrl, ownerName, ownerPhone, templateId
- **Order** — id, userId, petId, status, totalPrice, shippingName, shippingAddr, shippingPhone, slipUrl
- **Account / Session / VerificationToken** — NextAuth.js tables

## 📝 License

MIT
