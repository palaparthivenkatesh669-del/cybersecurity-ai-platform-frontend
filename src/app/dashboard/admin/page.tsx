'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const AdminPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <Skeleton count={5} height={80} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
      </div>
      <Card>
        <p className="text-gray-600">Administration panel - Coming soon</p>
      </Card>
    </div>
  );
};

export default AdminPage;
