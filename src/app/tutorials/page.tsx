"use client";

import Link from 'next/link';

export default function TutorialsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* O menu lateral é renderizado na página do dashboard, então
          precisamos ir para o dashboard para ver o menu */}
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Tutoriais Simples</h1>
          <p className="text-gray-600 mb-8">
            Bem-vindo à área de tutoriais. Aqui você encontra guias e instruções para usar o sistema.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-2">Como Abrir um Chamado</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>1. No menu lateral, clique em "1. Abrir Chamado".</li>
                <li>2. Preencha o título, a descrição e os outros campos.</li>
                <li>3. Clique em "Criar Chamado" para enviar a sua solicitação.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-2">Como Acompanhar um Chamado</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>1. No menu lateral, clique em "2. Acompanhar".</li>
                <li>2. Clique no chamado que deseja acompanhar para ver os detalhes.</li>
                <li>3. O status será atualizado pelo técnico responsável.</li>
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