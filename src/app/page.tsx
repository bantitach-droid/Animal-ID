import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              🐾 Animal ID
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-4">
              Create Beautiful ID Cards for Your Beloved Pets
            </p>
            <p className="text-base sm:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Design stunning pet ID cards with QR codes, public profiles, and
              instant sharing. Perfect for cats and dogs — keep your fur babies
              safe and identifiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                ✨ Create Your Card
              </Link>
              <Link
                href="/auth/signup"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url(&apos;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+&apos;)] opacity-30" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything Your Pet Needs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: "🎨",
              title: "Beautiful Card Templates",
              desc: "Choose from minimal, cartoon, or official ID styles. Live preview updates as you type.",
            },
            {
              emoji: "📱",
              title: "QR Code & Public Profile",
              desc: "Each card has a unique QR code linking to your pet&apos;s public profile with contact info.",
            },
            {
              emoji: "📥",
              title: "Download & Share",
              desc: "Export high-resolution PNG images of your pet&apos;s ID card to share anywhere.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-4 block">{f.emoji}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>🐾 Animal ID — Pet ID Card Generator</p>
          <p className="mt-1">Made with ❤️ for pet lovers</p>
        </div>
      </footer>
    </div>
  );
}
