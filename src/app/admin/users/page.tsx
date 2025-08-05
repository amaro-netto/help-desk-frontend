"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function ManageUsersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'TECHNICIAN' | 'ADMIN'>('USER');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });
      alert(`Usuário ${name} criado com sucesso!`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      alert('Erro ao criar o usuário. O e-mail pode já estar em uso.');
    }
  };

  return (
    <main>
      <h1>Gerenciar Usuários</h1>
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value as 'USER' | 'TECHNICIAN' | 'ADMIN')}>
          <option value="USER">Usuário</option>
          <option value="TECHNICIAN">Técnico</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <button type="submit">Criar Usuário</button>
      </form>
    </main>
  );
}