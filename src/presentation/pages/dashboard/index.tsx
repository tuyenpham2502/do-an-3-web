import React from 'react';
import { Button } from '@/presentation/components/ui/button';

const DashboardPage: React.FC = () => {
  // Mock data - would come from API in real implementation
  const stats = [
    { title: 'Total Plants', value: '24', change: '+2', status: 'increase' },
    { title: 'Need Attention', value: '3', change: '-1', status: 'decrease' },
    { title: 'Watered Today', value: '8', change: '80%', status: 'normal' },
    { title: 'Health Score', value: '95%', change: '+5%', status: 'increase' },
  ];

  const recentActivities = [
    { id: 1, action: 'Watered', plant: 'Monstera', time: '2 hours ago' },
    { id: 2, action: 'Fertilized', plant: 'Snake Plant', time: '5 hours ago' },
    { id: 3, action: 'Pruned', plant: 'Pothos', time: '1 day ago' },
  ];

  const plantStatus = [
    { name: 'Monstera', status: 'Healthy', nextWater: 'Tomorrow', light: 'Optimal' },
    { name: 'Snake Plant', status: 'Needs Water', nextWater: 'Today', light: 'Low' },
    { name: 'Pothos', status: 'Healthy', nextWater: '2 days', light: 'Medium' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Plant Care Dashboard</h1>
        <Button>Add New Plant</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span className={`text-sm ${
                stat.status === 'increase' ? 'text-green-500' :
                stat.status === 'decrease' ? 'text-red-500' :
                'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plant Status */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Plant Status</h2>
          <div className="space-y-4">
            {plantStatus.map((plant) => (
              <div key={plant.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{plant.name}</p>
                  <p className="text-sm text-gray-500">Next water: {plant.nextWater}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    plant.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {plant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {activity.action} - {activity.plant}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
