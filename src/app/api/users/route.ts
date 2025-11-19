import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const skip = (page - 1) * limit;

    // Получаване на всички активни потребители (без текущия)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        city: true,
        avatar: true,
        bio: true,
        createdAt: true,
      },
      where: {
        verified: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.user.count({
      where: {
        verified: true,
      },
    });

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json({ error: 'Възникна грешка' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
