'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

interface ProvidersProps {
  session: Session | null | undefined;
  children: ReactNode;
}

export default function Providers({ session, children }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
