"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('INCIDENT');
  const [priority, setPriority] = useState('LOW');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tickets', {
        title,
        description,
        type,
        priority
      });
      alert('Chamado criado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar chamado', error);
      alert('Erro ao criar o chamado.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Abrir Novo Chamado</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título do Chamado"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Descrição detalhada do problema ou aquisição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="INCIDENT">Incidente</option>
            <option value="AQUISITION">Aquisição</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
            <option value="CRITICAL">Crítica</option>
          </select>
          <button
            type="submit"
            className="w-full text-white font-bold py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Criar Chamado
          </button>
        </form>
      </div>
    </div>
  );
}