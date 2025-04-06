import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a property name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  totalUnits: {
    type: Number,
    required: [true, 'Please provide total number of units'],
    min: [0, 'Total units cannot be negative'],
  },
  occupiedUnits: {
    type: Number,
    required: [true, 'Please provide number of occupied units'],
    min: [0, 'Occupied units cannot be negative'],
  },
  monthlyRent: {
    type: Number,
    required: [true, 'Please provide monthly rent'],
    min: [0, 'Monthly rent cannot be negative'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'condo', 'house', 'townhouse'],
    required: [true, 'Please provide property type'],
  },
  amenities: [{
    type: String,
    enum: ['parking', 'pool', 'gym', 'security', 'laundry'],
  }],
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
PropertySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema); 