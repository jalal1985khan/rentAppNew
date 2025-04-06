import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongodbUri: process.env.MONGODB_URI ? 'Present' : 'Missing',
    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing',
    environment: process.env.NODE_ENV,
  });
} 