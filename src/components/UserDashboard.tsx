// src/components/UserDashboard.tsx
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

interface UserDashboardProps {
  tickets: Ticket[];
}

export default function UserDashboard({ tickets }: UserDashboardProps) {
  return (
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
  );
}