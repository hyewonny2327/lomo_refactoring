import './globals.css';
import styles from './styles/global.module.scss';

import { getServerSession, Session } from 'next-auth';
import { authOptions } from './utils/authOptions';
import SessionProviderWrapper from './Providers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session: Session | null = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={styles.container}>
        <SessionProviderWrapper session={session}>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
