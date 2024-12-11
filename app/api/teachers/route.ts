import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await connectDB(); // Connect to the database
    const teachers = await UserModel.find({ role: "Professeur" }) // Find users with the "Professeur" role
      .sort({ lastName: 1 }); // Sort by lastName in ascending order
    return NextResponse.json(teachers); // Return the results as JSON
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des professeurs" }, { status: 500 }); // Return an error response
  }
}

// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     console.log("Data Received:", data);
//     const teacher = await UserModel.create(data);
//     console.log("teacher: " + teacher);
//     return NextResponse.json(teacher, { status: 201 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Erreur lors de la création du professeur" }, { status: 500 });
//   }
// }
