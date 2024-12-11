import mongoose from "mongoose";
import StudentModel from "./Student";
import Student from "./Student";

const ClassSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, "La classe est requise"],
    },
    studentsNumber: {
      type: Number,
      required: [true, "Le nombre d'élève est requis"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    teacher: {
      type: String,
      required: [true, "Le professeur est requis"],
    },
    students: [Student],
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.models.Class || mongoose.model("Class", ClassSchema);

export default ClassModel;
