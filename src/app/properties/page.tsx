'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import PropertyForm from '@/components/properties/PropertyForm';
import PropertyDetails from '@/components/properties/PropertyDetails';

const properties = [
  {
    id: 1,
    name: 'Sunrise Apartments',
    address: '123 Main St, City, State 12345',
    totalUnits: 50,
    occupiedUnits: 45,
    monthlyRent: 1200,
    description: 'A modern apartment complex with excellent amenities.',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Ocean View Condos',
    address: '456 Beach Blvd, City, State 12345',
    totalUnits: 30,
    occupiedUnits: 28,
    monthlyRent: 2000,
    description: 'Luxury condominiums with ocean views.',
    status: 'Active',
  },
];

export default function PropertiesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);

  const handleAddProperty = (data: any) => {
    // Here you would typically make an API call to add the property
    console.log('Adding property:', data);
    setShowAddForm(false);
  };

  const handleViewProperty = (id: number) => {
    setSelectedProperty(id);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Property
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Property</h2>
          <PropertyForm onSubmit={handleAddProperty} />
        </div>
      )}

      {selectedProperty ? (
        <div>
          <button
            onClick={handleCloseDetails}
            className="mb-4 text-sm text-blue-600 hover:text-blue-500"
          >
            ← Back to Properties
          </button>
          <PropertyDetails 
            property={properties.find(p => p.id === selectedProperty)!} 
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {property.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{property.address}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {property.occupiedUnits}/{property.totalUnits}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        property.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleViewProperty(property.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 