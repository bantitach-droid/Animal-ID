import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PetProfileClient from "./PetProfileClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PetProfilePage({ params }: PageProps) {
  const { id } = await params;

  const pet = await prisma.pet.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });

  if (!pet) {
    notFound();
  }

  return (
    <PetProfileClient
      pet={{
        id: pet.id,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        gender: pet.gender,
        age: pet.age,
        weight: pet.weight,
        birthday: pet.birthday,
        color: pet.color,
        features: pet.features,
        healthInfo: pet.healthInfo,
        imageUrl: pet.imageUrl,
        ownerName: pet.ownerName,
        ownerPhone: pet.ownerPhone,
        templateId: pet.templateId,
      }}
    />
  );
}
