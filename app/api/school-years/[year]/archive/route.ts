import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import SchoolYear from '@/models/SchoolYear';
import Student from '@/models/Student';
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

    // Créer une collection archivée pour les étudiants
    const archiveCollectionName = `students_${params.year.replace('-', '_')}`;
    
    // Copier les données dans la nouvelle collection
    await Student.aggregate([
      { $out: archiveCollectionName }
    ]);

    // Marquer l'année comme archivée
    schoolYear.archivedAt = new Date();
    await schoolYear.save();

    return NextResponse.json({
      message: 'Année scolaire archivée avec succès',
      archiveCollection: archiveCollectionName
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'archivage de l'année scolaire" },
      { status: 500 }
    );
  }
}