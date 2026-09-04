import { User } from '@/types';

export interface PermissionChecker {
  has: (permission: string) => boolean;
  hasAny: (permissions: string[]) => boolean;
  hasAll: (permissions: string[]) => boolean;
}

export const createPermissionChecker = (user: User | null): PermissionChecker => {
  const userPermissions = user?.permissions || [];

  return {
    has: (permission: string) => userPermissions.includes(permission),
    hasAny: (permissions: string[]) =>
      permissions.some((permission) => userPermissions.includes(permission)),
    hasAll: (permissions: string[]) =>
      permissions.every((permission) => userPermissions.includes(permission)),
  };
};

export const hasRole = (user: User | null, role: string): boolean => {
  return user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  return user ? roles.includes(user.role) : false;
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'administrator';
};

export const isSecurityAdmin = (user: User | null): boolean => {
  return user?.role === 'security_admin' || user?.role === 'administrator';
};
