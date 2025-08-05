"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'TECHNICIAN' | 'ADMIN';
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  created_by: string;
  assigned_to: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 1. Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    const userStored = localStorage.getItem('user');

    if (!token || !userStored) {
      router.push('/auth/login');
      return;
    }

    const userData: User = JSON.parse(userStored);
    setUser(userData);

    // 2. Busca os chamados da API
    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Erro ao buscar chamados', error);
      }
    };

    fetchTickets();
  }, [router]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Seu papel: <strong>{user.role}</strong></p>
      
      {user.role === 'USER' && (
        <>
          <h2>Meus Chamados</h2>
          {tickets.length === 0 ? (
            <p>Você não abriu nenhum chamado.</p>
          ) : (
            <ul>
              {tickets.map(ticket => (
                <li key={ticket.id}>
                  <strong>{ticket.title}</strong> - Status: {ticket.status}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {(user.role === 'TECHNICIAN' || user.role === 'ADMIN') && (
        <>
          <h2>Todos os Chamados</h2>
          {tickets.length === 0 ? (
            <p>Nenhum chamado encontrado.</p>
          ) : (
            <ul>
              {tickets.map(ticket => (
                <li key={ticket.id}>
                  <strong>{ticket.title}</strong> - Status: {ticket.status} (Prioridade: {ticket.priority})
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}