'use client';
import { useState } from 'react';
import api from '../lib/api';

interface Device {
  id: number;
  name: string;
  devEui: string;
  isActive: boolean;
  createdAt: string;
}

interface DeviceListProps {
  devices: Device[];
  onDeviceUpdate: () => void;
}

export default function DeviceList({ devices, onDeviceUpdate }: DeviceListProps) {
  const [loadingDevice, setLoadingDevice] = useState<string | null>(null);

  const handleToggleDevice = async (devEui: string, currentStatus: boolean) => {
    setLoadingDevice(devEui);
    try {
      await api.patch(`/devices/${devEui}`, { isActive: !currentStatus });
      onDeviceUpdate();
    } catch (error) {
      console.error('Failed to update device:', error);
    } finally {
      setLoadingDevice(null);
    }
  };

  if (devices.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-500">No devices found. Add your first device to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-6 bg-gray-50">Your Devices</h2>
      <div className="divide-y">
        {devices.map((device) => (
          <div key={device.id} className="p-6 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.devEui}</p>
              <p className="text-sm text-gray-400">
                Added: {new Date(device.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded text-xs ${
                device.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {device.isActive ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={() => handleToggleDevice(device.devEui, device.isActive)}
                disabled={loadingDevice === device.devEui}
                className={`px-3 py-1 rounded text-sm ${
                  device.isActive
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {loadingDevice === device.devEui 
                  ? '...' 
                  : device.isActive ? 'Deactivate' : 'Activate'
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}