import { 
  Cog6ToothIcon, 
  BellIcon, 
  CreditCardIcon, 
  DocumentTextIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const settings = [
  {
    id: 1,
    name: 'General Settings',
    description: 'Basic application settings and preferences',
    icon: Cog6ToothIcon,
    items: [
      { name: 'Company Name', value: 'Rent Collection Inc.' },
      { name: 'Currency', value: 'USD ($)' },
      { name: 'Date Format', value: 'MM/DD/YYYY' },
      { name: 'Time Zone', value: 'UTC-5 (Eastern Time)' },
    ],
  },
  {
    id: 2,
    name: 'Notifications',
    description: 'Configure email and system notifications',
    icon: BellIcon,
    items: [
      { name: 'Payment Reminders', value: 'Enabled' },
      { name: 'New Tenant Alerts', value: 'Enabled' },
      { name: 'Visitor Notifications', value: 'Enabled' },
      { name: 'System Updates', value: 'Enabled' },
    ],
  },
  {
    id: 3,
    name: 'Payment Settings',
    description: 'Configure payment gateways and methods',
    icon: CreditCardIcon,
    items: [
      { name: 'Stripe Integration', value: 'Connected' },
      { name: 'PayPal Integration', value: 'Not Connected' },
      { name: 'Bank Transfer Details', value: 'Configured' },
      { name: 'Payment Terms', value: 'Net 30' },
    ],
  },
  {
    id: 4,
    name: 'Document Templates',
    description: 'Manage document templates and formats',
    icon: DocumentTextIcon,
    items: [
      { name: 'Lease Agreement', value: 'Default Template' },
      { name: 'Payment Receipt', value: 'Default Template' },
      { name: 'Gate Pass', value: 'Default Template' },
      { name: 'Maintenance Request', value: 'Default Template' },
    ],
  },
  {
    id: 5,
    name: 'Regional Settings',
    description: 'Configure regional preferences',
    icon: GlobeAltIcon,
    items: [
      { name: 'Language', value: 'English' },
      { name: 'Country', value: 'United States' },
      { name: 'Tax Settings', value: 'Configured' },
      { name: 'Legal Requirements', value: 'Updated' },
    ],
  },
  {
    id: 6,
    name: 'Security Settings',
    description: 'Manage security and access control',
    icon: ShieldCheckIcon,
    items: [
      { name: 'Two-Factor Authentication', value: 'Enabled' },
      { name: 'Password Policy', value: 'Strong' },
      { name: 'Session Timeout', value: '30 minutes' },
      { name: 'IP Restrictions', value: 'Not Configured' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-blue-500 p-3">
                  <setting.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {setting.name}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {setting.description}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                {setting.items.map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <span className="text-sm text-gray-500">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 