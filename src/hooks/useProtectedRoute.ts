'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores';

interface UseProtectedRouteOptions {
  requiredRole?: string | string[];
  requiredPermissions?: string | string[];
}

export const useProtectedRoute = (options?: UseProtectedRouteOptions) => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    // Check role if required
    if (options?.requiredRole) {
      const requiredRoles = Array.isArray(options.requiredRole)
        ? options.requiredRole
        : [options.requiredRole];
      if (!requiredRoles.includes(user.role)) {
        router.push('/dashboard');
        return;
      }
    }

    // Check permissions if required
    if (options?.requiredPermissions) {
      const requiredPermissions = Array.isArray(options.requiredPermissions)
        ? options.requiredPermissions
        : [options.requiredPermissions];
      const hasAllPermissions = requiredPermissions.every((perm) =>
        user.permissions.includes(perm)
      );
      if (!hasAllPermissions) {
        router.push('/dashboard');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, router, options]);

  return { isLoading, isAuthorized: isAuthenticated && user };
};
