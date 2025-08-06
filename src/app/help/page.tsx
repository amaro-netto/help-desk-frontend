"use client";

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify'; // Importamos a biblioteca

export default function HelpPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para envio do e-mail ainda não está implementada no backend.
    // Esta parte do código é apenas para a interface.
    toast.success('Sua mensagem foi enviada. O suporte entrará em contato em breve.'); // Substituído por toast.success
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Reclamação / Ajuda</h1>
          <p className="text-gray-600 mb-8">
            Se você tiver alguma dúvida ou problema, preencha o formulário abaixo ou entre em contato diretamente.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Seção do Formulário */}
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-4">Envie-nos um e-mail</h2>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sua mensagem ou reclamação"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full text-white font-bold py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200"
                >
                  Enviar
                </button>
              </form>
            </div>

            {/* Seção de Contatos */}
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-4">Contatos Diretos</h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Telefone:</strong> <a href="tel:99999999999" className="text-blue-600 hover:underline">(99) 99999-9999</a>
                </li>
                <li>
                  <strong>WhatsApp:</strong> <a href="https://wa.me/99999999999" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Entre em contato</a>
                </li>
                <li>
                  <strong>E-mail:</strong> <a href="mailto:suporte@empresa.com" className="text-blue-600 hover:underline">suporte@empresa.com</a>
                </li>
                <li>
                  <strong>Redes Sociais:</strong> <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@nomedasuarede</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/dashboard" className="text-blue-600 hover:underline">Voltar para o Dashboard</Link>
          </div>
        </div>
      </main>
    </div>
  );
}