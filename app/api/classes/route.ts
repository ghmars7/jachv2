import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ClassModel from "@/models/Classe";

export async function GET() {
  try {
    await connectDB(); // Connect to the database
    const classes = await ClassModel.find({}) // Find Students with the "Professeur" role
      .sort({ level: 1 }); // Sort by lastName in ascending order
    return NextResponse.json(classes); // Return the results as JSON
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la récupération des classes" }, { status: 500 }); // Return an error response
  }
}
