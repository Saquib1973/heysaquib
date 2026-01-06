import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function SignupForm() {
  const { signup, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Email and password are required');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password, name);
      // Redirect to dashboard or home
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white-0 dark:bg-black-1 rounded-lg shadow-lg border border-gray-0 dark:border-black-0">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-0 dark:text-white-0">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-2 dark:text-gray-1 mb-1">
            Name (Optional)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-0 dark:border-black-0 bg-white-1 dark:bg-black-2 text-black-0 dark:text-white-0 rounded-lg focus:ring-2 focus:ring-yellow-3 focus:border-transparent outline-none transition"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-2 dark:text-gray-1 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-0 dark:border-black-0 bg-white-1 dark:bg-black-2 text-black-0 dark:text-white-0 rounded-lg focus:ring-2 focus:ring-yellow-3 focus:border-transparent outline-none transition"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-2 dark:text-gray-1 mb-1">
            Password (Min 6 characters)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-0 dark:border-black-0 bg-white-1 dark:bg-black-2 text-black-0 dark:text-white-0 rounded-lg focus:ring-2 focus:ring-yellow-3 focus:border-transparent outline-none transition"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        {(error || formError) && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-300 dark:border-red-800">
            {error || formError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-3 hover:bg-yellow-2 text-black-0 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-2 dark:text-gray-1">
        Already have an account?{' '}
        <a href="/login" className="text-yellow-3 hover:text-yellow-2 hover:underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
}
