'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PropertyForm from '@/components/properties/PropertyForm';
import MobileHeader from '@/components/MobileHeader';
interface PropertyData {
  name: string;
  address: string;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRent: number;
  description: string;
  status: string;
  propertyType: string;
  amenities: string[];
}

export default function AddPropertyPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PropertyData) => {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to add property');
      
      router.push('/properties');
    } catch (err) {
      setError('Error adding property');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <MobileHeader />
      <div className="max-w-2xl mx-auto">
        {/* <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Add New Property</h1>
        </div> */}

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="">
          <PropertyForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
} 