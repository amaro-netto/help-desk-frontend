import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      {children}
    </div>
  );
}