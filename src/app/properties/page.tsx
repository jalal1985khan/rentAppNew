'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Property {
  _id: string;
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

export default function PropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError('Error loading properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProperty = (id: string) => {
    router.push(`/properties/${id}`);
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <button
            onClick={() => router.push('/properties/add')}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              onClick={() => handleViewProperty(property._id)}
              className="bg-white rounded-lg shadow p-4 space-y-2 active:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">{property.name}</h2>
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    property.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {property.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">{property.address}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="capitalize">{property.propertyType}</span>
                <span>•</span>
                <span>{property.occupiedUnits}/{property.totalUnits} units</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 