'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading, logout, fetchUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Loading State - Minimalist
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white-1 dark:bg-black-2">
        <div className="w-6 h-6 border-2 border-yellow-3 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white-1 dark:bg-black-2 font-sans">
      {/* Navbar - Flat, Border only */}
      <nav className="sticky top-0 z-30 bg-white-0 dark:bg-black-1 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-3 rounded-full"></span>
            <span className="font-semibold text-black-0 dark:text-white-0 tracking-tight">Admin Console</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              target="_blank"
              className="text-sm text-gray-500 hover:text-black-0 dark:text-gray-400 dark:hover:text-white-0 transition-colors"
            >
              View Live Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-black-0 dark:text-white-0 rounded border border-transparent transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl font-medium text-black-0 dark:text-white-0 mb-1">
                Overview
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Manage your content and settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdminCard 
                title="Manage Projects" 
                desc="View, edit, or delete portfolio items"
                href="/dashboard/projects"
                icon="folder"
              />
              <AdminCard 
                title="Add New Project" 
                desc="Create a new portfolio entry"
                href="/dashboard/project/new"
                icon="plus"
              />
              <AdminCard 
                title="Manage Blog" 
                desc="Write and publish new articles"
                href="/dashboard/blogs"
                icon="pen"
              />
              <AdminCard 
                title="Profile Settings" 
                desc="Update your bio and social links"
                href="/dashboard/settings"
                icon="user"
              />
            </div>
          </div>

          {/* Right Column: User Details (Simplified) */}
          <div className="lg:col-span-1">
            <div className="bg-white-0 dark:bg-black-1 border border-gray-200 dark:border-white/10 rounded-lg p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Current Session
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Logged in as</span>
                  <span className="text-black-0 dark:text-white-0 font-medium">{user.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Email</span>
                  <span className="text-black-0 dark:text-white-0">{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">User ID</span>
                  <span className="text-xs font-mono text-gray-400 break-all">{user.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for clean cards
function AdminCard({ title, desc, href, icon }: { title: string, desc: string, href: string, icon: string }) {
  return (
    <Link 
      href={href}
      className="block p-6 bg-white-0 dark:bg-black-1 border border-gray-200 dark:border-white/10 rounded-lg hover:border-yellow-3 dark:hover:border-yellow-3 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-gray-50 dark:bg-white/5 rounded text-black-0 dark:text-white-0">
           {icon === 'folder' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>}
           {icon === 'plus' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>}
           {icon === 'pen' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
           {icon === 'user' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
        </div>
        <span className="text-gray-300 group-hover:text-yellow-3 transition-colors">→</span>
      </div>
      <h3 className="font-medium text-black-0 dark:text-white-0">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </Link>
  );
}