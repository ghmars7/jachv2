import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import ClassModel from "../../../../models/Classe";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Ensure that params are awaited before accessing them
    const { id } = await params; // Await the params to access 'id'
    if (!id) {
      return NextResponse.json({ error: "ID non fourni" }, { status: 400 });
    }
    const teacher = await UserModel.findById(id);
    if (!teacher) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }
    return NextResponse.json(teacher);
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

    // Get Class to assign
    const data = await request.json();
    console.log("Received Data:", data);

    // Check if this class has a teacher
    const isClassHasTeacher = await ClassModel.findOne({ level: data.class, teacher: { $ne: "" } });
    // If so remove the class assigned to the user
    if (isClassHasTeacher) {
      await UserModel.findOneAndUpdate({ class: data.class }, { $set: { class: "" } }, { new: true });
    }

    // Check if the teacher has a class
    const isCurrentTeacherHasClass = await UserModel.find({
      firstName: data.firstName,
      lastName: data.lastName,
      class: { $ne: "" },
    });
    if (isCurrentTeacherHasClass) {
      const classToRemove = await UserModel.findOne({ firstName: data.firstName, lastName: data.lastName });
      await ClassModel.findOneAndUpdate({ level: classToRemove.class }, { $set: { teacher: "" } }, { new: true });
      await UserModel.findOneAndUpdate(
        {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        {
          class: "",
        },
        { new: true }
      );
    }

    // Update Class for the specific User
    const teacher = await UserModel.findByIdAndUpdate(id, data, { new: true });
    if (!teacher) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }

    // Assign New class to the user
    await ClassModel.findOneAndUpdate(
      { level: data.class },
      { $set: { teacher: `${data.firstName} ${data.lastName}` } },
      { new: true }
    );

    return NextResponse.json({ teacher });
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
    const teacher = await UserModel.findByIdAndDelete(id);
    if (!teacher) {
      return NextResponse.json({ error: "Professeur non trouvé" }, { status: 404 });
    }
    return NextResponse.json({ message: "Professeur supprimé avec succès" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la suppression du professeur" }, { status: 500 });
  }
}
