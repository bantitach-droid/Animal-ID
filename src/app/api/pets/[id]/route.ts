import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const pet = await prisma.pet.findUnique({ where: { id } });
  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }

  return NextResponse.json(pet);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existingPet = await prisma.pet.findUnique({ where: { id } });
  if (!existingPet || existingPet.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  try {
    const data = await req.json();
    const pet = await prisma.pet.update({
      where: { id },
      data: {
        name: data.name,
        species: data.species,
        breed: data.breed,
        gender: data.gender,
        age: data.age,
        weight: data.weight,
        birthday: data.birthday,
        color: data.color,
        features: data.features,
        healthInfo: data.healthInfo,
        imageUrl: data.imageUrl,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        templateId: data.templateId,
      },
    });
    return NextResponse.json(pet);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existingPet = await prisma.pet.findUnique({ where: { id } });
  if (!existingPet || existingPet.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  await prisma.pet.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
