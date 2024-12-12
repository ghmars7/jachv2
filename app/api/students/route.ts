import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import StudentModel from "@/models/Student";
import ClassModel from "@/models/Classe";

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
    const updatedClass = await ClassModel.findOneAndUpdate(
      { level: student.class },
      {
        $push: {
          students: {
            firstName: student.firstName,
            lastName: student.lastName,
            class: student.class,
            birthDate: student.birthDate,
            email: student.email,
            parentEmail: student.parentEmail,
            admission: student.admission,
          },
        },
        $inc: { studentsNumber: 1 },
      },
      { new: true }
    );

    console.log(updatedClass);

    console.log("student: " + student);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la création de l'élève" }, { status: 500 });
  }
}
