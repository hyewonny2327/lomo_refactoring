import localFont from 'next/font/local';
import './globals.css';
import styles from './styles/global.module.scss';
import Providers from './Providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 서버에서 초기화 함수 실행
  try {
    //await saveS3DataToDatabase();
    console.log('S3 data initialized on server.');
  } catch (error: unknown) {
    console.error('Error initializing S3 data:', error);
  }

  const session = null; // 서버에서 세션 가져오기 로직 추가 가능

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${styles.container}`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
