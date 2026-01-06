"use client"
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const { login, loading, error } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('All fields are required');
      return;
    }

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by context, but we catch here to prevent crash
      console.error('Login flow error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(error || formError) && (
        <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm rounded">
          {error || formError}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-white-0 dark:bg-black-1 border border-gray-200 dark:border-gray-800 text-black-0 dark:text-white-0 rounded focus:border-yellow-3 focus:outline-none transition-colors"
          placeholder="name@example.com"
          disabled={loading}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-white-0 dark:bg-black-1 border border-gray-200 dark:border-gray-800 text-black-0 dark:text-white-0 rounded focus:border-yellow-3 focus:outline-none transition-colors"
          placeholder="••••••••"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-3 hover:bg-yellow-2 text-black-0 font-medium py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? 'Authenticating...' : 'Sign In'}
      </button>
    </form>
  );
}