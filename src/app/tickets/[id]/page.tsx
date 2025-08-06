"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

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

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStored = localStorage.getItem('user');
    if (userStored) {
      setUser(JSON.parse(userStored));
    }

    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do chamado', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleAcceptTicket = async () => {
    if (!ticket) return;
    try {
      await api.post(`/tickets/${ticket.id}/accept`);
      alert('Chamado aceito com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao aceitar chamado', error);
      alert('Erro ao aceitar chamado.');
    }
  };

  const handleResolveTicket = async () => {
    if (!ticket) return;
    try {
      await api.put(`/tickets/${ticket.id}`, { status: 'RESOLVED', assigned_to: user?.id });
      alert('Chamado resolvido com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao resolver chamado', error);
      alert('Erro ao resolver chamado.');
    }
  };
  
  const handleCloseTicket = async () => {
    if (!ticket) return;
    try {
      await api.put(`/api/tickets/${ticket.id}`, { status: 'CLOSED', assigned_to: user?.id });
      alert('Chamado fechado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fechar chamado', error);
      alert('Erro ao fechar chamado.');
    }
  };


  if (loading) {
    return <main>Carregando...</main>;
  }

  if (!ticket) {
    return <main>Chamado não encontrado.</main>;
  }

  return (
    <main>
      <h1>Detalhes do Chamado: {ticket.title}</h1>
      <p><strong>Descrição:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Tipo:</strong> {ticket.type}</p>
      <p><strong>Prioridade:</strong> {ticket.priority}</p>
      <p><strong>Criado em:</strong> {new Date(ticket.created_at).toLocaleString()}</p>

      {user && (user.role === 'TECHNICIAN' || user.role === 'ADMIN') && ticket.status === 'OPEN' && (
        <button onClick={handleAcceptTicket}>
          Aceitar Chamado
        </button>
      )}

      {user && (user.role === 'TECHNICIAN' || user.role === 'ADMIN') && ticket.status === 'IN_PROGRESS' && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button onClick={handleResolveTicket} style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}>
            Marcar como Resolvido
          </button>
          <button onClick={handleCloseTicket} style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>
            Fechar Chamado
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link href="/dashboard">Voltar para o Dashboard</Link>
      </div>
    </main>
  );
}