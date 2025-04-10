'use client';
import { useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UsersIcon, 
  ArrowLeftOnRectangleIcon,
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  UserIcon,
  DocumentTextIcon,
  KeyIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut,userData } = useAuth();
  const pathname = usePathname();


  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

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
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Properties', href: '/properties', icon: BuildingOfficeIcon },
      { name: 'Tenants & Owners', href: '/tenants', icon: UserGroupIcon },
      { name: 'Payments', href: '/payments', icon: CurrencyDollarIcon },
      { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
      { name: 'Visitor Management', href: '/visitors', icon: KeyIcon },
    ];
  
    // Add admin-only menu items
    if (userData?.role === 'superadmin') {
      menuItems.push(
        { name: 'Users', href: '/users', icon: UserIcon },
        { name: 'Roles & Permissions', href: '/roles', icon: ShieldCheckIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon }
      );
    }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-purple-600">Rent Collection</h1>
          </div>

          {/* Navigation */}
          <nav className="items-center space-x-4">
            {/* <button
              onClick={() => router.push('/')}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Home"
            >
              <HomeIcon className="h-6 w-6 text-gray-600" />
            </button> */}

            {userData?.role === 'superadmin' && (
              <button
                onClick={() => router.push('/users')}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Users"
              >
                <UsersIcon className="h-6 w-6 text-gray-600" />
              </button>
            )}

            <button
              onClick={() => router.push('/profile')}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Profile"
            >
              <UserIcon className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-gray-100"
              title="Sign Out"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-600" />
            </button>
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
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
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {userData?.photoURL ? (
                    <Image
                      src={userData.photoURL}
                      alt={userData.name || 'User'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-lg">
                      {userData?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userData?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate capitalize">
                    {userData?.role || 'Role'}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 