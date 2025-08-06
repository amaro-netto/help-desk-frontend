"use client";

import Link from 'next/link';

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string; // Adicionei prioridade, pois o AdminDashboard a mostra
  created_by: string;
  assigned_to: string | null;
  created_at: string;
}

interface TicketListProps {
  tickets: Ticket[];
  title: string;
}

export default function TicketList({ tickets, title }: TicketListProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {tickets.length === 0 ? (
        <p>Nenhum chamado encontrado.</p>
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