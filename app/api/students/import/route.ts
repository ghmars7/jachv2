import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import StudentModel from "@/models/Student";
import { Student } from "@/types/index";
import UserModel from "@/models/User";
import ClassModel from "@/models/Classe";

export async function POSTCLASSES() {
  try {
    await connectDB();

    // Fetch all students
    const students = await StudentModel.find();

    // Validate that we have students
    if (!students || students.length === 0) {
      return NextResponse.json({ error: "No students found" }, { status: 400 });
    }

    // Group students by class
    const groupedClasses = students.reduce((acc: Record<string, any>, student) => {
      if (!acc[student.class]) {
        acc[student.class] = {
          level: student.class,
          students: [],
        };
      }
      acc[student.class].students.push(student);
      return acc;
    }, {});

    // Fetch all teachers
    const teachers = await UserModel.find({ role: "Professeur" });

    // Prepare classes with teacher information
    const classes = Object.keys(groupedClasses).map((className) => {
      const teacher = teachers.find((t) => t.class === className);

      return {
        level: className,
        teacher: teacher ? `${teacher.firstName} ${teacher.lastName}` : "Pas de professeur assigné à cette classe",
        students: groupedClasses[className].students.map((s: Student) => ({
          firstName: s.firstName,
          lastName: s.lastName,
          class: s.class,
          birthDate: s.birthDate,
          email: s.email,
          parentEmail: s.parentEmail,
          admission: s.admission,
        })),
        studentsNumber: groupedClasses[className].students.length,
      };
    });

    // Insert classes into the ClassModel collection
    const result = await ClassModel.insertMany(classes);

    return NextResponse.json({
      message: "Classes created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating classes:", error);
    return NextResponse.json({ error: "Error creating classes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    // Insérer les documents dans MongoDB
    const students = await request.json();
    console.log("Students data:", students);

    // Validation de la structure de données (assurez-vous que c'est un tableau d'étudiants)
    if (!Array.isArray(students)) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    const preparedStudents: Student[] = students.map((student) => ({
      // id: new Types.ObjectId().toString(), // Utilisation de mongoose.Types.ObjectId pour générer un id
      firstName: student.firstName,
      lastName: student.lastName,
      birthDate: student.birthDate, // Utiliser la date telle quelle
      email: student.email, // Générer un email basé sur prénom et nom
      parentEmail: student.parentEmail, // Email parent par défaut
      class: student.class, // Classe par défaut
      admission: student.admission,
    }));

    const result = await StudentModel.insertMany(preparedStudents, { ordered: false }).catch((error) => {
      if (error.writeErrors) {
        console.error("Write errors during insertMany:", error.writeErrors);
        return error.insertedDocs || [];
      }
      throw error;
    });
    console.log(result);

    // Classes creation
    await POSTCLASSES();

    return NextResponse.json({
      message: "Import terminé avec succès",
      imported: Array.isArray(result) ? result.length : 0,
    });
  } catch (error) {
    console.error("Erreur lors de l'import:", error);
    return NextResponse.json({ error: "Erreur lors de l'import des élèves" }, { status: 500 });
  }
}
