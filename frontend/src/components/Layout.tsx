import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="brand">
          Hackathon App
        </Link>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
