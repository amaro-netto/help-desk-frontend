// src/components/AdminDashboard.tsx
"use client";

import Link from 'next/link';

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

interface AdminDashboardProps {
  tickets: Ticket[];
}

export default function AdminDashboard({ tickets }: AdminDashboardProps) {
  return (
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
  );
}