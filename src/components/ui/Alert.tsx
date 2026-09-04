'use client';

import React from 'react';
import clsx from 'clsx';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  dismissible?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', onClose, dismissible = true, className, children, ...props }, ref) => {
    const typeStyles = {
      success: 'bg-success-50 border-success-200 text-success-800',
      error: 'bg-danger-50 border-danger-200 text-danger-800',
      warning: 'bg-warning-50 border-warning-200 text-warning-800',
      info: 'bg-cyber-50 border-cyber-200 text-cyber-800',
    };

    const typeIcons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'border rounded-lg p-4 flex items-start gap-3',
          typeStyles[type],
          className
        )}
        {...props}
      >
        <span className="font-bold text-lg flex-shrink-0">{typeIcons[type]}</span>
        <div className="flex-1">{children}</div>
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 font-bold hover:opacity-70 transition-opacity"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
