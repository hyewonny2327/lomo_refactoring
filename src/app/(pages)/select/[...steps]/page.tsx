'use client';
import Image from 'next/image';
import styles from '../../../styles/selectPage.module.scss';
import ProgressBar from '@/app/components/ProgressBar';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

interface SelectPageProps {
  params: {
    steps: string;
  };
}

const SelectPage = ({ params }: SelectPageProps) => {
  const { steps } = params; // steps 값 가져오기
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
          <div>slider</div>
        </div>
      </main>
      <footer className={styles.buttonContainer}>
        <Button type="outlined" size="large" color="black" onClick={handleClickPrevButton}>
          이전
        </Button>
        <Button type="outlined" size="large" color="black" onClick={handleClickNextButton}>
          다음
        </Button>
      </footer>
    </div>
  );
};

export default SelectPage;
