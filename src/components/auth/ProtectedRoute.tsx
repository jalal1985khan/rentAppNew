'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermissions = [],
}: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (userData) {
        // Check role
        if (requiredRole && userData.role !== requiredRole) {
          router.push('/unauthorized');
        }
        
        // Check permissions
        if (requiredPermissions.length > 0) {
          const hasPermission = requiredPermissions.every(permission =>
            userData.permissions.includes(permission)
          );
          
          if (!hasPermission) {
            router.push('/unauthorized');
          }
        }
      }
    }
  }, [user, userData, loading, requiredRole, requiredPermissions, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
} 