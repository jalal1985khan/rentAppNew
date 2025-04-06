import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  role: 'superadmin' | 'admin' | 'finance' | 'service' | 'security' | 'maintenance';
  department?: string;
  permissions: string[];
  otp?: {
    code: string;
    expiresAt: Date;
  };
  isVerified: boolean;
  createdBy?: mongoose.Types.ObjectId;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'finance', 'service', 'security', 'maintenance'],
    required: [true, 'Please provide a role'],
  },
  department: {
    type: String,
    required: function(this: IUser) {
      return ['finance', 'service', 'security', 'maintenance'].includes(this.role);
    },
  },
  permissions: [{
    type: String,
    enum: [
      'manage_users',
      'manage_properties',
      'manage_tenants',
      'manage_payments',
      'manage_reports',
      'manage_visitors',
      'manage_settings'
    ],
  }],
  otp: {
    code: String,
    expiresAt: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lastLogin: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model
let User: Model<IUser>;

try {
  // Try to get the existing model
  User = mongoose.model<IUser>('User');
} catch {
  // If the model doesn't exist, create it
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User; 