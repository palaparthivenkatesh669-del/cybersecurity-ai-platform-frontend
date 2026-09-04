'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  FiHome,
  FiAlertCircle,
  FiShield,
  FiBarChart3,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiZap,
} from 'react-icons/fi';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  requiredPermission?: string;
}

const navigationItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <FiHome /> },
  { name: 'Alerts', href: '/dashboard/alerts', icon: <FiAlertCircle /> },
  { name: 'Events', href: '/dashboard/events', icon: <FiZap /> },
  { name: 'Threats', href: '/dashboard/threats', icon: <FiShield /> },
  { name: 'Analytics', href: '/dashboard/analytics', icon: <FiBarChart3 /> },
  { name: 'AI Agent', href: '/dashboard/ai', icon: <FiMessageSquare /> },
  { name: 'Administration', href: '/dashboard/admin', icon: <FiUsers /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <FiSettings /> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:relative lg:translate-x-0 left-0 top-16 lg:top-0 h-[calc(100vh-64px)] lg:h-screen w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto transition-transform z-30',
          !isOpen && '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group relative',
                  isActive
                    ? 'bg-cyber-50 text-cyber-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="bg-danger-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
