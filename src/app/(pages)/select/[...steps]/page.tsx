'use client';
import Image from 'next/image';
import styles from '../../../styles/selectPage.module.scss';
import ProgressBar from '@/app/components/ProgressBar';
import Button from '@/app/components/Button';
import { useParams, useRouter } from 'next/navigation';
import Slider from '@/app/components/Slider';
import * as dotenv from 'dotenv';
dotenv.config();

const SelectPage = () => {
  const { steps } = useParams<{ steps: string }>();
  const router = useRouter();
  function handleClickNextButton() {
    const nextStep = Number(steps) + 1;
    if (nextStep > 6) {
      router.push('/select/result');
    } else {
      router.push(`/select/${nextStep}`);
    }
  }
  function handleClickPrevButton() {
    let nextStep = Number(steps) - 1;
    if (nextStep < 0) nextStep = 0;

    router.push(`/select/${nextStep}`);
  }

  return (
    <div className={styles.contentContainer}>
      <header className={styles.contentHeader}>
        <Image className={styles.logo} src="/logo.svg" alt="LOMO logo" width={141} height={41} priority />
        <ProgressBar currentId={Number(steps)} />
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.mainContainer__text}>
          <div>선택해주세요.</div>
        </div>
        <div className={styles.mainContainer__image}>
          <Image src="/logo.svg" alt="LOMO logo" width={141} height={41} priority></Image>
        </div>
        <div className={styles.mainContainer__slider}>
          <Slider />
        </div>
      </main>
      <footer className={styles.buttonContainer}>
        <Button type="outlined" size="large" color="primary" onClick={handleClickPrevButton}>
          이전
        </Button>
        <Button type="colored" size="large" color="primary" onClick={handleClickNextButton}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default SelectPage;
