import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// This is a placeholder - you'll need to implement actual OTP generation
// using a service like Twilio, AWS SNS, or your own OTP service
async function generateOTP(phone: string): Promise<string> {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // TODO: Send OTP via SMS using your preferred service
  return otp;
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db();
    
    // Check if user exists
    const user = await db.collection('users').findOne({ phone });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate and store OTP
    const otp = await generateOTP(phone);
    
    // Store OTP in database (you should implement proper expiration)
    await db.collection('otps').updateOne(
      { phone },
      { $set: { otp, createdAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return NextResponse.json(
      { error: 'Failed to generate OTP' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { phone, otp } = await request.json();
    
    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db();
    
    // Verify OTP
    const storedOTP = await db.collection('otps').findOne({ phone });
    
    if (!storedOTP || storedOTP.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Clear used OTP
    await db.collection('otps').deleteOne({ phone });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
} 