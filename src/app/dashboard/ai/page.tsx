'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const AIPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <Skeleton count={5} height={80} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Agent</h1>
        <p className="text-gray-600 mt-2">Chat with your AI security assistant</p>
      </div>
      <Card>
        <p className="text-gray-600">AI Agent chat - Coming soon</p>
      </Card>
    </div>
  );
};

export default AIPage;
