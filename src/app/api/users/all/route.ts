import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find({}).toArray();

    return NextResponse.json(users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      role: user.role || 'user',
      createdAt: user.createdAt,
    })));
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 