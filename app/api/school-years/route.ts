import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { SchoolYear } from '@/types/index';
import SchoolYearModel from '@/models/SchoolYear';

export async function GET() {
  try {
    await connectDB();
    const schoolYears: SchoolYear[] = await SchoolYearModel.find({}).sort({ year: -1 }); // Annotate the type
    return NextResponse.json(schoolYears);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des années scolaires' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) { // Use NextRequest here
  try {
    const user = await requireAdmin(request);
    if ('error' in user) {
      return NextResponse.json(user, { status: 401 });
    }

    await connectDB();
    const data = await request.json();

    // Désactiver l'année active actuelle si la nouvelle année doit être active
    if (data.isActive) {
      await SchoolYearModel.updateMany({}, { isActive: false });
    }

    const schoolYear = await SchoolYearModel.create(data);
    return NextResponse.json(schoolYear, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erreur lors de la création de l'année scolaire" },
      { status: 500 }
    );
  }
}
