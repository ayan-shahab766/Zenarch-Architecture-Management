"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE } from "@/utils/api";
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post(`${API_BASE}/api/users`, {
        name,
        email,
        password,
      });

      // Optional: store user data in localStorage or context
      console.log('Registered user:', data);

      // Redirect to login page
      router.push('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair text-white mb-2">Create Account</h1>
          <p className="text-gray-400 font-light text-sm">Join the Zenarch premium experience</p>
        </div>

        <div className="glass-card p-8">
          {error && <div className="bg-burgundy/50 border border-burgundy text-white px-4 py-3 rounded mb-6 text-sm">{error}</div>}

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Register
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400 pb-4 border-b border-white/10">
            Already have an account? <Link href="/login" className="text-gold hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
