import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не е автентифициран' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Невалиден токен' }, { status: 401 });
    }

    // TODO: Когато имаме база данни, ще връщаме реални данни
    // За сега връщаме mock данни

    return NextResponse.json({ 
      user: {
        email: decoded.email,
        name: 'Потребител',
        city: 'София',
        bio: 'Добре дошли в моя профил!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
        subscription: {
          plan: 'basic',
          active: true,
        },
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Възникна грешка' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Не е автентифициран' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Невалиден токен' }, { status: 401 });
    }

    const { name, bio, city, avatar } = await request.json();

    // TODO: Когато имаме база данни, ще актуализираме реални данни
    // За сега връщаме mock данни

    return NextResponse.json({ 
      user: {
        email: decoded.email,
        name: name || 'Потребител',
        bio: bio || 'Добре дошли в моя профил!',
        city: city || 'София',
        avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Възникна грешка при актуализирането' }, { status: 500 });
  }
}
