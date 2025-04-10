import { PlusIcon } from '@heroicons/react/24/outline';
import MobileHeader from '@/components/MobileHeader';

const roles = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full access to all features and settings',
    permissions: ['All'],
    users: 2,
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Can manage properties, tenants, and payments',
    permissions: ['Properties', 'Tenants', 'Payments', 'Reports'],
    users: 3,
  },
  {
    id: 3,
    name: 'Staff',
    description: 'Can view properties and manage visitors',
    permissions: ['Properties', 'Visitors'],
    users: 5,
  },
];

const permissions = [
  'Properties',
  'Tenants',
  'Payments',
  'Reports',
  'Visitors',
  'Users',
  'Roles',
  'Settings',
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <MobileHeader />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Roles & Permissions</h1>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
          <PlusIcon className="mr-2 h-5 w-5" />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Roles</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {roles.map((role) => (
                <li key={role.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {role.name}
                        </p>
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {role.users} users
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {role.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {role.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Available Permissions</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 gap-4">
              {permissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center rounded-lg border border-gray-200 p-4"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 