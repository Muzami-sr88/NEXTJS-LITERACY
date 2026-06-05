"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/Admin/Dashboard';

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
  
    const isLoggedIn = !!localStorage.getItem('admin_token');
    if (!isLoggedIn) {
      router.replace('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return <div className="p-8 text-center">Checking authentication...</div>;

  return (
    <main className="min-h-screen py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <Dashboard />
      </div>
    </main>
  );
}
