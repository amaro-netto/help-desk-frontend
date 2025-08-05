"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro no login', error);
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col p-8 bg-white shadow-lg rounded-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox mr-2" />
              Lembrar de mim
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white font-bold py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}