'use client';
import useAvatarStore from '@/app/stores/store';
import { ResultType, TextBlock } from '@/app/types/types';
import { fetchResults } from '@/app/services/client/fetchResults';
import React, { useEffect, useState } from 'react';
import { fetchAvatarImageById } from '@/app/services/client/fetchAvatarImageById';
import styles from '../../../styles/resultPage.module.scss';
import Image from 'next/image';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
const ResultPage = () => {
  const { finalAvatarId, resetStore } = useAvatarStore();
  const resultNumber = Number(finalAvatarId.join(''));
  const [upperTypeData, setUpperTypeData] = useState<TextBlock>();
  const [lowerTypeData, setLowerTypeData] = useState<TextBlock>();
  const [avatarInfo, setAvatarInfo] = useState({ upperType: '', lowerType: '' });
  const [avatarImage, setAvatarImage] = useState({ id: '', url: '' });
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  function setResultData(result: ResultType) {
    //avatarInfo 저장
    const newAvatarInfo = { upperType: result.avatarInfo.upperType, lowerType: result.avatarInfo.lowerType };
    setAvatarInfo(newAvatarInfo);
    //상체 textBlock 저장
    setUpperTypeData({ ...result.resultText[0] });
    //하체 textBlock 저장
    setLowerTypeData({ ...result.resultText[1] });
  }

  useEffect(() => {
    //결과 이미지, 텍스트 가져오기

    async function fetchResultData() {
      try {
        const result = await fetchResults(resultNumber);
        console.log('result', result);
        setResultData(result);
      } catch (error) {
        console.error('results 를 가져오지 못했습니다', error);
      }
    }

    async function fetchAvatarImage() {
      try {
        const avatarImage = await fetchAvatarImageById(resultNumber.toString());
        setAvatarImage(avatarImage);
      } catch (error) {
        console.error('avatar image 를 가져오지 못했습니다', error);
      }
    }
    fetchResultData();
    fetchAvatarImage();
  }, [resultNumber]);

  // useEffect(() => {
  //   //아바타 이미지 로딩상태
  //   if (avatarImage.url === '') {
  //     setIsLoading(true);
  //   } else setIsLoading(false);
  // }, [avatarImage]);

  function handleClickHomeButton() {
    resetStore();
    router.push('/');
  }

  const isLoading = avatarImage.url === '';

  return (
    <div className={styles.resultPage}>
      <section className={styles.resultPage__avatarImageContainer}>
        <Image
          className={styles.resultPage__avatarImageContainer__logo}
          src="/logo.svg"
          alt="LOMO logo"
          width={141}
          height={41}
          priority
        />
        <header className={styles.resultPage__avatarImageContainer__title}>
          {isLoading ? (
            <div className={styles.resultPage__avatarImageContainer__title__upper}>잠시만 기다려주세요</div>
          ) : (
            <>
              <div className={styles.resultPage__avatarImageContainer__title__upper}>{avatarInfo.upperType}</div>
              <div className={styles.resultPage__avatarImageContainer__title__lower}>{avatarInfo.lowerType}</div>
            </>
          )}
        </header>
        <main>
          {isLoading ? (
            <Image
              className={styles.resultPage__avatarImageContainer__image}
              src={'/loadingAvatar.svg'}
              alt="Avatar"
              layout="intrinsic"
              width={174}
              height={98}
            />
          ) : (
            <Image
              className={styles.resultPage__avatarImageContainer__image}
              src={avatarImage.url}
              alt="Avatar"
              layout="intrinsic"
              width={174}
              height={98}
            />
          )}
        </main>
      </section>
      <section className={styles.resultPage__textContainer}>
        <div className={styles.resultPage__textContainer__title}>1. 상체 분석</div>
        <div>{upperTypeData?.summary}</div>
        <div className={styles.resultPage__textContainer__subtitle}>스타일링 TIP!</div>
        <div className={styles.resultPage__textContainer__stylingTip}>{upperTypeData?.stylingTips.description}</div>
        {upperTypeData?.stylingTips.tips.map((item, id) => (
          <div key={id} className={styles.resultPage__textContainer__tipsBlock}>
            <span className={styles.resultPage__textContainer__tipsBlock__category}>{item.category} :</span>
            <span className={styles.resultPage__textContainer__tipsBlock__description}>{item.description}</span>
          </div>
        ))}
      </section>
      <section className={styles.resultPage__textContainer}>
        <div className={styles.resultPage__textContainer__title}>2. 하체 분석</div>
        <div>{lowerTypeData?.summary}</div>
        <div className={styles.resultPage__textContainer__subtitle}>스타일링 TIP!</div>
        <div className={styles.resultPage__textContainer__stylingTip}>{lowerTypeData?.stylingTips.description}</div>
        {lowerTypeData?.stylingTips.tips.map((item, id) => (
          <div key={id} className={styles.resultPage__textContainer__tipsBlock}>
            <span className={styles.resultPage__textContainer__tipsBlock__category}>{item.category} :</span>
            <span className={styles.resultPage__textContainer__tipsBlock__description}>{item.description}</span>
          </div>
        ))}
      </section>
      <section className={styles.resultPage__buttonContainer}>
        <Button type="colored" size="large" color="primary">
          결과 공유하기
        </Button>
        <Button type="outlined" size="large" color="black" onClick={handleClickHomeButton}>
          처음으로 돌아가기
        </Button>
      </section>
    </div>
  );
};

export default ResultPage;
