'use client';
import './globals.css';
import styles from './styles/global.module.scss';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function RootLayout({ children, session }: { children: React.ReactNode; session: Session }) {
  return (
    <html lang="en">
      <body className={` ${styles.container}`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
