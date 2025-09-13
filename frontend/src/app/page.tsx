'use client';


import { keycloak } from '../../lib/keycloak';
import { useAuth } from '../../contexts/AuthContext';
import DeviceDashboard from '../../components/DeviceDashboard';

export default function Home() {
  const { isAuthenticated, login, user } = useAuth();

  // Debug information
  console.log('Auth state:', { isAuthenticated, user });
  console.log('Environment vars:', {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">LoRaWAN Device Manager</h1>
          <p className="mb-4">Please login to manage your devices</p>
          <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
            <p>Debug: isAuthenticated = {String(isAuthenticated)}</p>
            <p>Debug: user = {user ? 'exists' : 'null'}</p>
          </div>
          <button 
            onClick={login}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login with Keycloak
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Device Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.preferred_username}</span>
              <button 
                onClick={() => keycloak.logout()}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <DeviceDashboard />
      </main>
    </div>
  );
}