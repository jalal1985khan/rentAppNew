import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const { db } = await connectToDatabase();
    console.log('Successfully connected to MongoDB');
    
    const properties = await db.collection('properties').find({}).sort({ createdAt: -1 }).toArray();
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
    const { db } = await connectToDatabase();
    console.log('Successfully connected to MongoDB');
    
    const result = await db.collection('properties').insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const property = await db.collection('properties').findOne({ _id: result.insertedId });
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