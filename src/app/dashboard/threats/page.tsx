'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const ThreatsPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <Skeleton count={5} height={80} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Threats</h1>
        <p className="text-gray-600 mt-2">Monitor detected threats</p>
      </div>
      <Card>
        <p className="text-gray-600">Threats view - Coming soon</p>
      </Card>
    </div>
  );
};

export default ThreatsPage;
