'use client';
import { useState, useEffect } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userData, logout } = useAuth();
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Properties', href: '/properties', icon: BuildingOfficeIcon },
    { name: 'Tenants', href: '/tenants', icon: UserGroupIcon },
    { name: 'Payments', href: '/payments', icon: CurrencyDollarIcon },
  ];

  if (userData?.role === 'superadmin') {
    menuItems.push({ name: 'Users', href: '/users', icon: UserIcon });
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-4 text-xl font-bold text-primary">
              Rent Collection
            </Link>
          </div>
          
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Offcanvas Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar Content */}
        <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            {user && (
              <div className="p-4 border-t">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userData?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData?.role || 'Role'}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 