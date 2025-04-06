import { useState } from 'react';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface PropertyFormProps {
  initialData?: {
    name: string;
    address: string;
    totalUnits: number;
    monthlyRent: number;
    description: string;
    propertyType: string;
    amenities: string[];
  };
  onSubmit: (data: any) => void;
}

const propertyTypes = [
  { id: 'apartment', name: 'Apartment Complex' },
  { id: 'condo', name: 'Condominium' },
  { id: 'house', name: 'Single Family Home' },
  { id: 'townhouse', name: 'Townhouse' },
];

const amenities = [
  { id: 'parking', name: 'Parking' },
  { id: 'pool', name: 'Swimming Pool' },
  { id: 'gym', name: 'Gym' },
  { id: 'security', name: 'Security' },
  { id: 'laundry', name: 'Laundry Facilities' },
];

export default function PropertyForm({ initialData, onSubmit }: PropertyFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    totalUnits: initialData?.totalUnits || 0,
    monthlyRent: initialData?.monthlyRent || 0,
    description: initialData?.description || '',
    propertyType: initialData?.propertyType || 'apartment',
    amenities: initialData?.amenities || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalUnits' || name === 'monthlyRent' ? Number(value) : value
    }));
  };

  const handleAmenityChange = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
   
      {/* Form Content */}
      <div className="">
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Property Name"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Property Address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HomeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="totalUnits"
                    id="totalUnits"
                    value={formData.totalUnits}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Total Units"
                    required
                    min="0"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="monthlyRent"
                    id="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Monthly Rent"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="propertyType"
                  id="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {amenities.map((amenity) => (
                    <label key={amenity.id} className="inline-flex items-center p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.id)}
                        onChange={() => handleAmenityChange(amenity.id)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 pt-2 pointer-events-none">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Property Description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-black bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {initialData ? 'Update Property' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 