import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import SchoolYear from '@/models/SchoolYear';
import StudentModel from '@/models/Student';
import ClassModel from '@/models/Classe'; // Modèle pour les classes
import { requireAdmin } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { year: string } }
) {
  try {
    const user = await requireAdmin(request);
    if ('error' in user) {
      return NextResponse.json(user, { status: 401 });
    }

    await connectDB();

    // Vérifier si l'année existe
    const schoolYear = await SchoolYear.findOne({ year: params.year });
    if (!schoolYear) {
      return NextResponse.json(
        { error: 'Année scolaire non trouvée' },
        { status: 404 }
      );
    }

    // Archiver la collection Students
    const studentArchiveCollectionName = `students_${params.year.replace('-', '_')}`;
    await StudentModel.aggregate([{ $out: studentArchiveCollectionName }]);

    // Archiver la collection Classes
    // const classArchiveCollectionName = `classes_${params.year.replace('-', '_')}`;
    // await ClassModel.aggregate([{ $out: classArchiveCollectionName }]);

    // Marquer l'année comme archivée
    schoolYear.archivedAt = new Date();
    await schoolYear.save();

    return NextResponse.json({
      message: 'Année scolaire archivée avec succès',
      archivedCollections: {
        students: studentArchiveCollectionName,
       // classes: classArchiveCollectionName,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'archivage de l'année scolaire" },
      { status: 500 }
    );
  }
}
