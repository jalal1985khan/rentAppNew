import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://jalal1985khan:esZUeiJYfeITEmxk@cluster0.2jqe5.mongodb.net/RentAppNew?retryWrites=true&w=majority&appName=Cluster0';

async function createSuperAdmin() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    
    const superAdmin = {
      name: 'Super Admin',
      phone: '+919731415095',
      role: 'superadmin',
      password: 'admin123', // Change this to a secure password
      createdAt: new Date()
    };

    // Check if super admin already exists
    const existingAdmin = await db.collection('users').findOne({ phone: superAdmin.phone });
    if (existingAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Create super admin
    const result = await db.collection('users').insertOne(superAdmin);
    console.log('Super admin created successfully:', result.insertedId);
  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await client.close();
  }
}

createSuperAdmin(); 