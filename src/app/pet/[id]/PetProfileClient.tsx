"use client";

import CardPreview from "@/components/CardPreview";
import type { PetFormData } from "@/components/PetForm";

interface PetProfileClientProps {
  pet: {
    id: string;
    name: string;
    species: string;
    breed: string | null;
    gender: string | null;
    age: string | null;
    weight: string | null;
    birthday: string | null;
    color: string | null;
    features: string | null;
    healthInfo: string | null;
    imageUrl: string | null;
    ownerName: string | null;
    ownerPhone: string | null;
    templateId: string;
  };
}

export default function PetProfileClient({ pet }: PetProfileClientProps) {
  const formData: PetFormData = {
    name: pet.name,
    species: pet.species,
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
    templateId: pet.templateId,
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Public Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {pet.species === "dog" ? "🐕" : "🐈"} {pet.name}
          </h1>
          <p className="text-gray-500">Pet ID Card & Public Profile</p>
        </div>

        {/* Card Preview */}
        <div className="flex justify-center mb-8">
          <CardPreview data={formData} petId={pet.id} />
        </div>

        {/* Full Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📋 Full Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileField label="Name" value={pet.name} />
            <ProfileField label="Species" value={pet.species === "dog" ? "Dog 🐕" : "Cat 🐈"} />
            <ProfileField label="Breed" value={pet.breed} />
            <ProfileField label="Gender" value={pet.gender} />
            <ProfileField label="Age" value={pet.age} />
            <ProfileField label="Weight" value={pet.weight ? `${pet.weight} kg` : null} />
            <ProfileField label="Birthday" value={pet.birthday} />
            <ProfileField label="Color / Markings" value={pet.color} />
            {pet.features && (
              <div className="sm:col-span-2">
                <ProfileField label="Special Features" value={pet.features} />
              </div>
            )}
            {pet.healthInfo && (
              <div className="sm:col-span-2">
                <ProfileField label="Health Information" value={pet.healthInfo} />
              </div>
            )}
          </div>

          {/* Contact Owner Section */}
          {pet.ownerPhone && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📞 Contact Owner
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Found this pet? Contact the owner immediately:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${pet.ownerPhone}`}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  📞 Call Owner Now
                </a>
                {pet.ownerName && (
                  <div className="flex-1 bg-gray-50 py-3 rounded-xl text-center">
                    <p className="text-xs text-gray-400">Owner</p>
                    <p className="font-medium text-gray-700">
                      {pet.ownerName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}
