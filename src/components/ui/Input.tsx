'use client';

import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = true, className, ...props }, ref) => {
    return (
      <div className={clsx(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'w-full px-3 py-2 border rounded-lg transition-colors',
              icon && 'pl-10',
              error
                ? 'border-danger-500 focus:border-danger-500 focus:ring-2 focus:ring-danger-200'
                : 'border-gray-300 focus:border-cyber-500 focus:ring-2 focus:ring-cyber-200',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-danger-600 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
