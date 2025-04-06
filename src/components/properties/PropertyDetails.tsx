import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon, HomeIcon } from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  property: {
    id: number;
    name: string;
    address: string;
    totalUnits: number;
    occupiedUnits: number;
    monthlyRent: number;
    description: string;
    status: string;
  };
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const occupancyRate = (property.occupiedUnits / property.totalUnits) * 100;
  const monthlyRevenue = property.occupiedUnits * property.monthlyRent;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">{property.name}</h2>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
            property.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.status}
          </span>
        </div>

        <div className="mt-4 flex items-center text-gray-500">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <p>{property.address}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Units</p>
                <p className="text-lg font-semibold text-gray-900">{property.totalUnits}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-6 w-6 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Occupied Units</p>
                <p className="text-lg font-semibold text-gray-900">{property.occupiedUnits}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Rent</p>
                <p className="text-lg font-semibold text-gray-900">${property.monthlyRent}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-lg font-semibold text-gray-900">${monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Description</h3>
          <p className="mt-2 text-gray-500">{property.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Occupancy Rate</h3>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">{occupancyRate.toFixed(1)}% occupied</p>
        </div>
      </div>
    </div>
  );
} 