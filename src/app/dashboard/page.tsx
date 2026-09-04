'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/stores';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { FiAlertCircle, FiShield, FiZap, FiTrendingUp, FiActivity, FiBarChart3 } from 'react-icons/fi';
import Link from 'next/link';

const StatCard = ({
  icon,
  label,
  value,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: number;
  color: string;
}) => (
  <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend !== undefined && (
          <p className={`text-sm mt-2 ${trend >= 0 ? 'text-danger-600' : 'text-success-600'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </Card>
);

const DashboardPage = () => {
  const { metrics, alerts, events, isLoading, fetchMetrics, fetchAlerts, fetchEvents } =
    useDashboardStore();

  useEffect(() => {
    fetchMetrics();
    fetchAlerts();
    fetchEvents();
  }, [fetchMetrics, fetchAlerts, fetchEvents]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton count={4} height={120} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your security overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiBarChart3 className="w-6 h-6 text-cyber-600" />}
          label="Security Score"
          value={metrics?.securityScore || 0}
          trend={5}
          color="bg-cyber-50"
        />
        <StatCard
          icon={<FiShield className="w-6 h-6 text-danger-600" />}
          label="Threats Detected"
          value={metrics?.threatCount || 0}
          trend={-2}
          color="bg-danger-50"
        />
        <StatCard
          icon={<FiAlertCircle className="w-6 h-6 text-warning-600" />}
          label="Critical Alerts"
          value={metrics?.criticalAlerts || 0}
          trend={0}
          color="bg-warning-50"
        />
        <StatCard
          icon={<FiZap className="w-6 h-6 text-success-600" />}
          label="Recent Events"
          value={metrics?.recentEvents || 0}
          trend={12}
          color="bg-success-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
              <Link href="/dashboard/alerts" className="text-cyber-600 hover:text-cyber-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      alert.severity === 'critical'
                        ? 'bg-danger-600'
                        : alert.severity === 'high'
                        ? 'bg-warning-600'
                        : 'bg-cyber-600'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600 truncate">{alert.description}</p>
                  </div>
                  <Badge variant={alert.severity === 'critical' ? 'danger' : 'warning'} size="sm">
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* System Health */}
        <div>
          <Card className="bg-white border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Backend</span>
                  <Badge variant="success" size="sm">
                    Healthy
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Database</span>
                  <Badge variant="success" size="sm">
                    Healthy
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">AI Service</span>
                  <Badge variant="warning" size="sm">
                    Limited
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-warning-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Events */}
      <Card className="bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Security Events</h2>
          <Link href="/dashboard/events" className="text-cyber-600 hover:text-cyber-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Event Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 5).map((event) => (
                <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{event.eventType}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={event.severity === 'critical' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {event.severity}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{new Date(event.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="text-success-600 font-medium">{event.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
