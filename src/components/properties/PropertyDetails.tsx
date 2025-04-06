import {
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

interface PropertyDetailsProps {
  property: {
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
  };
  onClose?: () => void;
}

const amenities = [
  { id: 'parking', name: 'Parking' },
  { id: 'pool', name: 'Swimming Pool' },
  { id: 'gym', name: 'Gym' },
  { id: 'security', name: 'Security' },
  { id: 'laundry', name: 'Laundry Facilities' },
];

export default function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  const occupancyRate = (property.occupiedUnits / property.totalUnits) * 100;
  const monthlyRevenue = property.occupiedUnits * property.monthlyRent;

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center space-x-4">
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h2 className="text-xl font-semibold text-gray-900">{property.name}</h2>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500 capitalize">{property.propertyType}</span>
          </div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
            property.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {property.status}
          </span>
        </div>

        <div className="flex items-center text-gray-500">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <p className="text-sm">{property.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-gray-500 text-sm">{property.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center p-2 rounded-lg border border-gray-200">
                {property.amenities.includes(amenity.id) ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-gray-300 mr-2" />
                )}
                <span className="text-sm text-gray-700">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Occupancy Rate</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
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