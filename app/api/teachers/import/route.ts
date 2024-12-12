import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeacherModel from "@/models/Teacher";
import { Teacher } from "@/types/index";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();

    // Insérer les documents dans MongoDB
    const teachers = await request.json();
    console.log("Teachers data:", teachers);

    // Validation de la structure de données (assurez-vous que c'est un tableau d'étudiants)
    if (!Array.isArray(teachers)) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    const preparedTeachers: Teacher[] = teachers.map((teacher) => ({
      id: new Types.ObjectId().toString(), // Utilisation de mongoose.Types.ObjectId pour générer un id
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      birthDate: teacher.birthDate,
      email: teacher.email,
      parentEmail: teacher.parentEmail,
      class: teacher.class,
      password: teacher.password,
    }));

    const result = await TeacherModel.insertMany(preparedTeachers, { ordered: false }).catch((error: any) => {
      if (error.writeErrors) {
        console.error("Write errors during insertMany:", error.writeErrors);
        return error.insertedDocs || [];
      }
      throw error;
    });
    console.log(result);

    return NextResponse.json({
      message: "Import terminé avec succès",
      imported: Array.isArray(result) ? result.length : 0,
    });
  } catch (error) {
    console.error("Erreur lors de l'import:", error);
    return NextResponse.json({ error: "Erreur lors de l'import des élèves" }, { status: 500 });
  }
}
