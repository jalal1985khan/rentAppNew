import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching property' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const property = await Property.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating property' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const property = await Property.findByIdAndDelete(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting property' },
      { status: 500 }
    );
  }
} 