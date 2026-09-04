'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const AlertsPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <Skeleton count={5} height={80} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-600 mt-2">Manage and review security alerts</p>
      </div>
      <Card>
        <p className="text-gray-600">Alerts view - Coming soon</p>
      </Card>
    </div>
  );
};

export default AlertsPage;
