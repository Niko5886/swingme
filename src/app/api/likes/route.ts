import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не е автентифициран' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Невалиден токен' }, { status: 401 });
    }

    const { likedUserId } = await request.json();

    if (!likedUserId) {
      return NextResponse.json({ error: 'Липсва ID на лайкнатия потребител' }, { status: 400 });
    }

    if (likedUserId === decoded.userId) {
      return NextResponse.json({ error: 'Не можете да се лайкнете сами' }, { status: 400 });
    }

    // Проверка дали вече е лайкнат
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_likedUserId: {
          userId: decoded.userId,
          likedUserId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({ error: 'Вече е лайкнат' }, { status: 400 });
    }

    // Създаване на лайк
    const like = await prisma.like.create({
      data: {
        userId: decoded.userId,
        likedUserId,
      },
    });

    return NextResponse.json({ like }, { status: 201 });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ error: 'Възникна грешка' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не е автентифициран' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Невалиден токен' }, { status: 401 });
    }

    const { likedUserId } = await request.json();

    if (!likedUserId) {
      return NextResponse.json({ error: 'Липсва ID на лайкнатия потребител' }, { status: 400 });
    }

    // Премахване на лайк
    await prisma.like.delete({
      where: {
        userId_likedUserId: {
          userId: decoded.userId,
          likedUserId,
        },
      },
    });

    return NextResponse.json({ message: 'Лайкът е премахнат' }, { status: 200 });
  } catch (error) {
    console.error('Unlike error:', error);
    return NextResponse.json({ error: 'Възникна грешка' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
