import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pets = await prisma.pet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(pets);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const pet = await prisma.pet.create({
      data: {
        userId: session.user.id,
        name: data.name || "Unnamed Pet",
        species: data.species || "cat",
        breed: data.breed || null,
        gender: data.gender || null,
        age: data.age || null,
        weight: data.weight || null,
        birthday: data.birthday || null,
        color: data.color || null,
        features: data.features || null,
        healthInfo: data.healthInfo || null,
        imageUrl: data.imageUrl || null,
        ownerName: data.ownerName || null,
        ownerPhone: data.ownerPhone || null,
        templateId: data.templateId || "minimal",
      },
    });

    return NextResponse.json(pet, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create pet" },
      { status: 500 }
    );
  }
}
