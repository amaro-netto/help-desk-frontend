"use client";

import TicketList from './TicketList';

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
    <TicketList 
      tickets={tickets} 
      title="Todos os Chamados" 
    />
  );
}