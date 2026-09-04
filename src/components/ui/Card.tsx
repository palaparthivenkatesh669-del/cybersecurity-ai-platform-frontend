'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ bordered = true, hoverable = false, padding = 'md', className, children, ...props }, ref) => {
    const paddingStyles = {
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'bg-white rounded-lg shadow-sm',
          bordered && 'border border-gray-200',
          hoverable && 'transition-shadow hover:shadow-md cursor-pointer',
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
