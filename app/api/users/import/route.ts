import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { User } from "@/types/index";
import { Types } from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();

    // Insérer les documents dans MongoDB
    const users = await request.json();
    console.log("Users data:", users);

    // Validation de la structure de données (assurez-vous que c'est un tableau d'étudiants)
    if (!Array.isArray(users)) {
      return new NextResponse("Invalid data format", { status: 400 });
    }

    const preparedUsers: User[] = users.map((user) => ({
      id: new Types.ObjectId().toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      password: user.password,
      class: user.class,
    }));

    const result = await UserModel.insertMany(preparedUsers, { ordered: false }).catch((error: any) => {
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
    return NextResponse.json({ error: "Erreur lors de l'import de l'utilisateur" }, { status: 500 });
  }
}
