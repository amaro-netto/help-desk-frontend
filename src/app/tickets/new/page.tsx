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
      await api.post('/api/tickets', {
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
    <main>
      <h1>Criar Novo Chamado</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="INCIDENT">Incidente</option>
          <option value="AQUISITION">Aquisição</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="CRITICAL">Crítica</option>
        </select>
        <button type="submit">Criar Chamado</button>
      </form>
    </main>
  );
}