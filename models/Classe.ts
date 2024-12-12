import mongoose from "mongoose";
import StudentModel from "./Student";

const ClassSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: [true, "La classe est requise"],
      unique: true,
    },
    studentsNumber: {
      type: Number,
      required: [true, "Le nombre d'élève est requis"],
    },
    teacher: {
      type: String,
      required: [true, "Le professeur est requis"],
    },
    students: {
      type: Array,
      value: [StudentModel],
    },
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.models.Class || mongoose.model("Class", ClassSchema);

export default ClassModel;
