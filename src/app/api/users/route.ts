import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ phone });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      photoURL: user.photoURL,
      email: user.email,
      role: user.role || 'user',
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { phone, name, role, password } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // If creating a super admin, require password
    if (role === 'superadmin' && !password) {
      return NextResponse.json(
        { error: 'Password is required for super admin' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      name: name || '',
      phone,
      role: role || 'user',
      password: role === 'superadmin' ? password : undefined,
      createdAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);

    if (!result.insertedId) {
      throw new Error('Failed to create user');
    }

    return NextResponse.json({
      id: result.insertedId.toString(),
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 