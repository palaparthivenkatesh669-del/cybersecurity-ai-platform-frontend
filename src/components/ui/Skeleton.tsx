'use client';

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: string | number;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = (
  { count = 1, height = '1rem', circle = false, className, ...props }
) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 animate-pulse ${
            circle ? 'rounded-full' : 'rounded'
          } ${className}`}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
          }}
          {...props}
        />
      ))}
    </div>
  );
};

export default Skeleton;
