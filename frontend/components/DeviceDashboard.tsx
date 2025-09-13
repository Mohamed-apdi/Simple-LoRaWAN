'use client';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import AddDeviceForm from './AddDeviceForm';
import DeviceList from './DeviceList';

interface Device {
  id: number;
  name: string;
  devEui: string;
  isActive: boolean;
  createdAt: string;
}

export default function DeviceDashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchDevices = async () => {
    try {
      const response = await api.get('/devices');
      setDevices(response.data);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showAddForm ? 'Cancel' : 'Add New Device'}
        </button>
      </div>

      {showAddForm && (
        <AddDeviceForm
          onDeviceAdded={() => {
            setShowAddForm(false);
            fetchDevices();
          }} 
        />
      )}

      <DeviceList devices={devices} onDeviceUpdate={fetchDevices} />
    </div>
  );
}