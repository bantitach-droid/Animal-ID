"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PetForm, { PetFormData, defaultFormData } from "@/components/PetForm";
import CardPreview from "@/components/CardPreview";

function CreateCardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState<PetFormData>(defaultFormData);
  const [savedPetId, setSavedPetId] = useState<string | undefined>(editId || undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPetData = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/pets/${id}`);
      if (res.ok) {
        const pet = await res.json();
        setFormData({
          name: pet.name || "",
          species: pet.species || "cat",
          breed: pet.breed || "",
          gender: pet.gender || "",
          age: pet.age || "",
          weight: pet.weight || "",
          birthday: pet.birthday || "",
          color: pet.color || "",
          features: pet.features || "",
          healthInfo: pet.healthInfo || "",
          imageUrl: pet.imageUrl || "",
          ownerName: pet.ownerName || "",
          ownerPhone: pet.ownerPhone || "",
          templateId: pet.templateId || "minimal",
        });
        setSavedPetId(pet.id);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (editId) {
      fetchPetData(editId);
    }
  }, [status, router, editId, fetchPetData]);

  const handleSubmit = async (data: PetFormData) => {
    if (!session?.user?.id) return;
    setIsLoading(true);

    try {
      const url = editId ? `/api/pets/${editId}` : "/api/pets";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const pet = await res.json();
        setSavedPetId(pet.id);
        if (!editId) {
          router.push(`/pet/${pet.id}`);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {editId ? "✏️ Edit Pet Card" : "✨ Create Pet Card"}
        </h1>
        <p className="text-gray-500 mt-1">
          Fill in the details and watch the card update in real-time!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Card Preview - Sticky on mobile and desktop */}
        <div className="lg:order-2 lg:w-[400px] flex-shrink-0">
          <div className="sticky top-20">
            <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Live Preview
            </h2>
            <CardPreview data={formData} petId={savedPetId} />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 lg:order-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <PetForm
              data={formData}
              onChange={setFormData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              submitLabel={editId ? "Update Card" : "Save Pet Card"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-gray-400 text-lg">Loading...</div>
        </div>
      }
    >
      <CreateCardContent />
    </Suspense>
  );
}
