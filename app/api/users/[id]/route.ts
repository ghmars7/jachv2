import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération du professeur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const data = await request.json();
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération du professeur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Professeur supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la suppression du professeur" }, { status: 500 });
  }
}
