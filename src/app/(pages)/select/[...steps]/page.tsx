'use client';
import Image from 'next/image';
import styles from '../../../styles/selectPage.module.scss';
import ProgressBar from '@/app/components/ProgressBar';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import Slider from '@/app/components/Slider';
import * as dotenv from 'dotenv';
import { useEffect, useState } from 'react';
import { fetchAvatars } from '@/app/utils/api/fetchAvatarImages';
import SelectGender from '@/app/components/SelectGender';
import useAvatarStore from '@/app/stores/store';
dotenv.config();

const SelectPage = () => {
  const { step, avatarIds, goNextStep, goPrevStep, updateAvatarState, history } = useAvatarStore();
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState<number>(0); // 슬라이더 값을 상태로 관리
  const [avatarImages, setAvatarImages] = useState<{ id: string; url: string }[]>([]);
  const stepInfo = [
    { id: 0, value: '성별', description: '성별을 선택하세요' },
    { id: 1, value: '어깨', description: '어깨너비를 선택하세요' },
    { id: 2, value: '승모근', description: '승모근을 선택하세요' },
    { id: 3, value: '골반', description: '골반를 선택하세요' },
    { id: 4, value: '대퇴골', description: '대퇴골을 선택하세요' },
    { id: 5, value: '허리', description: '허리를 선택하세요' },
  ];
  useEffect(() => {
    console.log('step', step, 'ids', avatarIds, 'history', history);
    fetchAvatars(avatarIds)
      .then((avatars) => setAvatarImages(avatars))
      .catch((error) => console.error(error));
  }, [avatarIds]);

  useEffect(() => {
    if (step <= 5) {
      router.push(`/select/${step}`);
    }
  }, [step, router]);
  function handleClickNextButton() {
    updateAvatarState(step, sliderValue);
    //step up
    if (step < 5) {
      goNextStep();
    } else if (step === 5) {
      router.push(`/select/result`);
    }
  }
  function handleClickPrevButton() {
    goPrevStep();
  }

  return (
    <div className={styles.contentContainer}>
      <header className={styles.contentHeader}>
        <Image className={styles.logo} src="/logo.svg" alt="LOMO logo" width={141} height={41} priority />
        <ProgressBar currentId={step} />
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.mainContainer__text}>
          <div>{stepInfo[step].description}</div>
        </div>
        <div className={styles.mainContainer__image}>
          {/* step 0 : 성별 선택, step 1~5 : 아바타 선택.*/}
          {step === 0 && <SelectGender />}
          {step > 0 && avatarImages.length !== 0 && (
            <div className={styles.mainContainer__image__avatarImage}>
              <Image
                src={avatarImages[sliderValue].url}
                alt="LOMO logo"
                fill
                sizes="140px"
                style={{ objectFit: 'none' }}
              ></Image>
            </div>
          )}
        </div>
        <div className={styles.mainContainer__slider}>
          <Slider value={sliderValue} setValue={setSliderValue} />
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
