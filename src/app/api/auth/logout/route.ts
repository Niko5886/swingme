import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: 'Успешно излизане' },
    { status: 200 }
  );

  // Изтриване на cookie токен
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
