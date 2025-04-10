'use client';

import {
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import MobileHeader from '@/components/MobileHeader';
import { useState } from 'react';

const reports = [
  {
    id: 1,
    name: 'Monthly Collection Report',
    description: 'Detailed report of all payments collected this month',
    icon: CurrencyDollarIcon,
    type: 'Financial',
  },
  {
    id: 2,
    name: 'Occupancy Report',
    description: 'Property-wise occupancy and vacancy analysis',
    icon: BuildingOfficeIcon,
    type: 'Operational',
  },
  {
    id: 3,
    name: 'Tenant Analytics',
    description: 'Tenant demographics and behavior analysis',
    icon: UserGroupIcon,
    type: 'Analytics',
  },
  {
    id: 4,
    name: 'Financial Performance',
    description: 'Year-over-year financial performance comparison',
    icon: ChartBarIcon,
    type: 'Financial',
  },
];

const recentReports = [
  {
    id: 1,
    name: 'March Collection Report',
    generatedBy: 'Admin',
    date: '2024-04-01',
    type: 'Financial',
  },
  {
    id: 2,
    name: 'Q1 Occupancy Analysis',
    generatedBy: 'Manager',
    date: '2024-04-02',
    type: 'Operational',
  },
  {
    id: 3,
    name: 'Tenant Satisfaction Survey',
    generatedBy: 'Admin',
    date: '2024-04-03',
    type: 'Analytics',
  },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = recentReports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.generatedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Generate Report
            </button>
            <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Export All
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Report Templates Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-lg bg-blue-500 p-3">
                    <report.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {report.type}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {report.name}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View Report
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>

          {/* Mobile Cards View */}
          <div className="sm:hidden space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {report.type}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {report.generatedBy}
                  </div>
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-4 w-4 mr-1" />
                    {report.date}
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800">
                    <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Generated By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {report.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">{report.generatedBy}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">{report.date}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reports found
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 