import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Successfully connected to MongoDB');
    
    const properties = await Property.find({}).sort({ createdAt: -1 });
    console.log('Found properties:', properties);
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error in GET /api/properties:', error);
    return NextResponse.json(
      { error: 'Error fetching properties', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Successfully connected to MongoDB');
    
    const property = await Property.create(body);
    console.log('Created property:', property);
    
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/properties:', error);
    return NextResponse.json(
      { error: 'Error creating property', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 