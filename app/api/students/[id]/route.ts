import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import StudentModel from "@/models/Student";

// Handle GET request
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const student = await StudentModel.findById(id);
    if (!student) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération de l'élève" }, { status: 500 });
  }
}

// Handle PUT request
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const data = await request.json();
    const student = await StudentModel.findByIdAndUpdate(id, data, { new: true });
    if (!student) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour de l'élève" }, { status: 500 });
  }
}

// Handle DELETE request
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const student = await StudentModel.findByIdAndDelete(id);
    if (!student) {
      return NextResponse.json({ error: "Élève non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Élève supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la suppression de l'élève" }, { status: 500 });
  }
}
