import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import StudentModel from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    const students = await StudentModel.find({}).sort({ lastName: 1 });
    return NextResponse.json(students);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des élèves" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const student = await StudentModel.create(data);
    console.log("student: " + student);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la création de l'élève" }, { status: 500 });
  }
}
