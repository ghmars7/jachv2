import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UserModel from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    console.log('beee')
    // Trouver l'utilisateur
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("mountain")

      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log("zig")
    // Vérifier le mot de passe
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      console.log("space")
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Générer le token
    const token = generateToken(user);
    console.log('deed')

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}