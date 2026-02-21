"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string | null;
  gender: string | null;
  imageUrl: string | null;
  templateId: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = useCallback(async () => {
    try {
      const res = await fetch("/api/pets");
      if (res.ok) {
        const data = await res.json();
        setPets(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (status === "authenticated") {
      fetchPets();
    }
  }, [status, router, fetchPets]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pet card?")) return;
    try {
      const res = await fetch(`/api/pets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPets(pets.filter((p) => p.id !== id));
      }
    } catch {
      // ignore network errors
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            🐾 My Collection
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {session?.user?.name || "Pet Lover"}!
          </p>
        </div>
        <Link
          href="/create"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center gap-2"
        >
          ✨ Create Card
        </Link>
      </div>

      {/* Pet Cards Grid */}
      {pets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-6xl block mb-4">🐱</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No pets yet!
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first pet ID card and start your collection.
          </p>
          <Link
            href="/create"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            + Create Your First Card
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Pet Image */}
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center overflow-hidden">
                {pet.imageUrl ? (
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">
                    {pet.species === "dog" ? "🐕" : "🐈"}
                  </span>
                )}
              </div>

              {/* Pet Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                <p className="text-sm text-gray-500">
                  {pet.breed || pet.species} · {pet.gender || "Unknown"}
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/pet/${pet.id}`}
                    className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/create?edit=${pet.id}`}
                    className="flex-1 text-center bg-gray-50 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="px-3 bg-red-50 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
