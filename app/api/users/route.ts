import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const teachers = await UserModel.find({}).sort({ lastName: 1 });
    return NextResponse.json(teachers);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log("Data Received:", data);
    const teacher = await UserModel.create(data);
    console.log("teacher: " + teacher);
    return NextResponse.json(teacher, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la création du utilisateur" }, { status: 500 });
  }
}
