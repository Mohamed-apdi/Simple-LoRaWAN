'use client';
import { useState } from 'react';
import api from '../lib/api';

interface AddDeviceFormProps {
  onDeviceAdded: () => void;
}

export default function AddDeviceForm({ onDeviceAdded }: AddDeviceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    devEui: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post('/devices', formData);
      onDeviceAdded();
      setFormData({ name: '', devEui: '' });
    } catch (error) {
      console.error('Failed to add device:', error);
      alert('Failed to add device. Please check the Device EUI format.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Device</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Device Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Device EUI</label>
          <input
            type="text"
            required
            pattern="[0-9A-Fa-f]{16}"
            title="16-character hexadecimal string"
            value={formData.devEui}
            onChange={(e) => setFormData({ ...formData, devEui: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="1234567890ABCDEF"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isLoading ? 'Adding...' : 'Add Device'}
        </button>
      </form>
    </div>
  );
}