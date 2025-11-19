import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username || username.trim().length === 0) {
      return NextResponse.json(
        { available: false, message: 'Потребителското име не може да е празно' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { available: false, message: 'Потребителското име трябва да е минимум 3 символа' },
        { status: 400 }
      );
    }

    if (username.length > 20) {
      return NextResponse.json(
        { available: false, message: 'Потребителското име не може да е повече от 20 символа' },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9а-яёА-ЯЁ_-]+$/.test(username)) {
      return NextResponse.json(
        { available: false, message: 'Букви, цифри, тире и долни черти' },
        { status: 400 }
      );
    }

    // TODO: Когато имаме база данни, добавяме проверка за дублиране
    // За сега приемаме че потребителското име е свободно

    return NextResponse.json(
      { available: true, message: 'Потребителското име е свободно' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Username check error:', error);
    return NextResponse.json(
      { available: false, error: 'Възникна грешка при проверката' },
      { status: 500 }
    );
  }
}
