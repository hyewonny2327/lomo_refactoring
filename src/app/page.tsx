'use client';
import Image from 'next/image';
import styles from './styles/home.module.scss';
import Button from './components/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  function handleClickStartButton() {
    router.push('/select/0');
  }
  function handleClickLoginButton() {
    router.push('/login');
  }
  return (
    <div className={styles.contentContainer}>
      <Image className={styles.logo} src="/logo.svg" alt="LOMO logo" width={263} height={77} priority />
      <div className={styles.textBox}>
        <div>&quot;내 몸을 알고 나를 알다&quot;</div>
        <div>체형분석을 통해 당신만의 특별함을 찾아보세요</div>
      </div>
      <div className={styles.buttonBox}>
        <Button type="outlined" size="large" color="primary" onClick={handleClickLoginButton}>
          로그인
        </Button>
        <Button type="colored" size="large" color="primary" onClick={handleClickStartButton}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
