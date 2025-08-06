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

interface UserDashboardProps {
  tickets: Ticket[];
}

export default function UserDashboard({ tickets }: UserDashboardProps) {
  return (
    <TicketList 
      tickets={tickets} 
      title="Meus Chamados" 
    />
  );
}