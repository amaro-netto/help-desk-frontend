"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { io, Socket } from 'socket.io-client';

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
    let isMounted = true; 
    const token = localStorage.getItem('token');
    const userStored = localStorage.getItem('user');

    if (!token || !userStored) {
      router.push('/auth/login');
      return;
    }

    const userData: User = JSON.parse(userStored);
    setUser(userData);

    const fetchTickets = async () => {
      try {
        const response = await api.get('/api/tickets');
        if (isMounted) {
          setTickets(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar chamados', error);
      }
    };

    fetchTickets();

    let socket: Socket;
    if (userData.role === 'TECHNICIAN' || userData.role === 'ADMIN') {
      socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');
      socket.emit('technician-available', userData.id);

      socket.on('new-ticket-alert', (newTicket) => {
        alert(`Novo Chamado Aberto: ${newTicket.title}`);
        fetchTickets();
      });
    }

    return () => {
      isMounted = false;
      if (socket) {
        socket.disconnect();
      }
    };

  }, [router]);

  if (!user) {
    return <main>Carregando...</main>;
  }

  return (
    <main>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Seu papel: <strong>{user.role}</strong></p>

      {user.role === 'USER' && (
        <>
          <Link href="/tickets/new" style={{ padding: '0.75rem', backgroundColor: '#28a745', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
            Abrir Novo Chamado
          </Link>
          <h2 style={{ marginTop: '1rem' }}>Meus Chamados</h2>
          {tickets.length === 0 ? (
            <p>Você não abriu nenhum chamado.</p>
          ) : (
            <ul>
              {tickets.map(ticket => (
                <li key={ticket.id}>
                  <Link href={`/tickets/${ticket.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <strong>{ticket.title}</strong> - Status: {ticket.status}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {(user.role === 'TECHNICIAN' || user.role === 'ADMIN') && (
        <>
          <h2 style={{ marginTop: '1rem' }}>Todos os Chamados</h2>
          {tickets.length === 0 ? (
            <p>Nenhum chamado encontrado.</p>
          ) : (
            <ul>
              {tickets.map(ticket => (
                <li key={ticket.id}>
                  <Link href={`/tickets/${ticket.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <strong>{ticket.title}</strong> - Status: {ticket.status} (Prioridade: {ticket.priority})
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {user.role === 'ADMIN' && (
        <div style={{ marginTop: '2rem' }}>
          <Link href="/admin/users" style={{ padding: '0.75rem', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
            Gerenciar Usuários
          </Link>
        </div>
      )}
    </main>
  );
}