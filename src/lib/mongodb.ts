import mongoose from 'mongoose';

// Define the type for the cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Initialize the global mongoose cache
const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache;
};

const MONGODB_URI = process.env.MONGODB_URI;

// Log environment variables for debugging
console.log('MONGODB_URI:', MONGODB_URI ? 'Present' : 'Missing');

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('Error in MongoDB connection:', e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB; 