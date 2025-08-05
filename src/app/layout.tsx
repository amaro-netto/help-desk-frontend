import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Chamados",
  description: "Gerenciamento de aquisições e incidentes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{ backgroundColor: '#007bff', color: 'white', padding: '1rem', textAlign: 'center' }}>
          <h2>Sistema de Chamados</h2>
        </header>
        {children}
      </body>
    </html>
  );
}