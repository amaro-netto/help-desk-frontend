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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Menu Lateral) */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6m-6 0v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          {user.role === 'ADMIN' && (
            <Link href="/admin/users" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a1 1 0 01-.866-.5L9.5 2.154A1 1 0 008.134 2H5.986A2 2 0 004 4v10a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2h-2.134a1 1 0 00-1.366.5zM7 11a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              Gerenciar Usuários
            </Link>
          )}
          {user.role === 'USER' && (
            <Link href="/tickets/new" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Novo Chamado
            </Link>
          )}
          <button className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </nav>
      </aside>

      {/* Main Content (Conteúdo Principal) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bem-vindo, {user.name}!</h1>
        <p className="text-gray-600 mb-6">Seu papel: <strong>{user.role}</strong></p>
        
        {user.role === 'USER' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Meus Chamados</h2>
            {tickets.length === 0 ? (
              <p>Você não abriu nenhum chamado.</p>
            ) : (
              <ul className="space-y-2">
                {tickets.map(ticket => (
                  <li key={ticket.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <Link href={`/tickets/${ticket.id}`} className="block">
                      <strong className="text-blue-600">{ticket.title}</strong> - Status: {ticket.status}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {(user.role === 'TECHNICIAN' || user.role === 'ADMIN') && (
          <>
            <h2 className="text-2xl font-bold mb-4">Todos os Chamados</h2>
            {tickets.length === 0 ? (
              <p>Nenhum chamado encontrado.</p>
            ) : (
              <ul className="space-y-2">
                {tickets.map(ticket => (
                  <li key={ticket.id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                    <Link href={`/tickets/${ticket.id}`} className="block">
                      <strong className="text-blue-600">{ticket.title}</strong> - Status: {ticket.status} (Prioridade: {ticket.priority})
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}