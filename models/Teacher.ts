import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    class: {
      type: String,
      required: [true, "La classe est requise"],
    },
    birthDate: {
      type: String,
      required: [true, "La date de naissance est requise"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export default mongoose.models.TeacherModel || mongoose.model("Teacher", TeacherSchema);
// Create and export the model only once
const TeacherModel = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);

export default TeacherModel;
