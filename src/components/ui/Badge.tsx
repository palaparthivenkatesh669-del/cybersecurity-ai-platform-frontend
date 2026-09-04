'use client';

import React from 'react';
import clsx from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'sm', className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gray-200 text-gray-800',
      success: 'bg-success-100 text-success-800 border border-success-300',
      warning: 'bg-warning-100 text-warning-800 border border-warning-300',
      danger: 'bg-danger-100 text-danger-800 border border-danger-300',
      info: 'bg-cyber-100 text-cyber-800 border border-cyber-300',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs font-medium rounded',
      md: 'px-3 py-1 text-sm font-medium rounded-full',
    };

    return (
      <div
        ref={ref}
        className={clsx('inline-block', variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
