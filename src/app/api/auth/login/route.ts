import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и парола са задължителни' },
        { status: 400 }
      );
    }

    // TODO: Когато имаме база данни, ще проверяваме потребителя
    // За сега просто приемаме влизането

    // Създаване на JWT токен
    const token = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      {
        message: 'Влизането беше успешно',
        user: {
          email,
          name: 'Потребител',
        },
        subscription: {
          plan: 'basic',
          active: true,
        },
      },
      { status: 200 }
    );

    // Задаване на HttpOnly cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Възникна грешка при влизането' },
      { status: 500 }
    );
  }
}
