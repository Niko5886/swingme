import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, username, birthDate, gender } = body;

    // Валидация - ако има всички полета (от profile/create страницата)
    if (fullName && username && gender) {
      if (!email || !password || !fullName || !username || !gender) {
        return NextResponse.json(
          { error: 'Всички полета са задължителни' },
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return NextResponse.json(
          { error: 'Паролата трябва да е минимум 8 символа' },
          { status: 400 }
        );
      }

      // Хеширане на паролата
      const hashedPassword = await bcrypt.hash(password, 10);

      // TODO: Запис в база данни с пълна информация
      return NextResponse.json(
        {
          message: 'Регистрацията беше успешна',
          user: {
            email,
            username,
            name: fullName,
          },
        },
        { status: 201 }
      );
    }

    // Базова регистрация - само email и password (от началната страница)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и парола са задължителни' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Паролата трябва да е минимум 6 символа' },
        { status: 400 }
      );
    }

    // Хеширане на паролата
    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Запис в база данни с базова информация
    // Потребителят ще попълни профила си на следващата стъпка

    return NextResponse.json(
      {
        message: 'Регистрацията беше успешна',
        user: {
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Възникна грешка при регистрацията' },
      { status: 500 }
    );
  }
}
