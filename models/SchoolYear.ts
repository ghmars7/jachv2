import mongoose from 'mongoose';

const SchoolYearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "L'année scolaire est requise"],
    unique: true,
    // Format: "2023-2024"
    validate: {
      validator: function(v: string) {
        return /^\d{4}-\d{4}$/.test(v);
      },
      message: (props: { value: any; }) => `${props.value} n'est pas un format d'année scolaire valide (YYYY-YYYY)`
    }
  },
  isActive: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.models.SchoolYearModel || mongoose.model('SchoolYear', SchoolYearSchema);