import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uid, ...updateData } = await request.json();
    
    // Verify the user is updating their own profile
    if (session.user.id !== uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await connectToDatabase();
    const db = client.db();
    
    // Update user data in MongoDB
    const result = await db.collection('users').updateOne(
      { _id: uid },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
} 