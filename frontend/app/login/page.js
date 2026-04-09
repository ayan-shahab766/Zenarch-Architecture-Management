"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE } from "@/utils/api";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/api/users/login`, {
        email,
        password,
      });

      // Example: Save user info and token
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Redirect based on role
      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 font-light text-sm">Sign in to your Zenarch account</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zenarch.com"
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
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 accent-gold" /> Remember me
              </label>
              <a href="#" className="text-gold hover:text-white transition-colors">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400 pb-4 border-b border-white/10">
            Don't have an account? <Link href="/register" className="text-gold hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
