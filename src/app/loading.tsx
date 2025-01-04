import React from 'react';
import Image from 'next/image';
import styles from './styles/loading.module.scss';
const Loading = () => {
  const loadingTexts = [
    '봄에는 밝은 색상의 블라우스가 딱! 화사한 핑크와 연한 베이지 조합으로, 사랑스러움이 한껏 업!',
    '여름엔 화이트와 네이비 조합이 완벽! 시원한 느낌의 스트라이프 티셔츠로 청량함을 더해보세요!',
    '가을엔 따뜻한 카키색이 인기! 카키 재킷에 검정 바지를 매치하면, 간단하지만 세련된 룩 완성!',
    '겨울엔 레드와 그레이의 만남! 레드 스웨터와 그레이 팬츠로 포인트를 주면 따뜻하면서도 멋스러운 겨울 룩!',
    '양말과 모자의 색을 맞춰보세요! 작은 디테일이지만, 전체적인 스타일에 통일감을 주는 팁이에요.',
    '무채색 옷을 입을 때, 가방이나 신발에 컬러 포인트를 주면 심플하면서도 멋스러워요!',
    '체크무늬 셔츠를 입을 땐, 한 가지 색상만 강하게 강조해주면 더 세련된 느낌이 나요.',
    '평범한 청바지에 티셔츠를 입을 땐, 액세서리로 포인트를 주면 스타일이 확 달라져요!',
    '어두운 색의 의상엔 밝은 색의 스카프나 액세서리로 밸런스를 맞춰보세요. 전체적인 조화가 좋아져요!',
  ];
  function getRandomNumber(number: number): number {
    return Math.floor(Math.random() * number) + 1;
  }
  return (
    <div className={styles.container}>
      <div className={styles.loading__text}>로딩중!</div>
      <div className={styles.loading__tipBox}>
        <Image
          className={styles.loading__tipBox__image}
          src={`/animals/animal${getRandomNumber(9)}.svg`}
          alt="animal icon"
          width={77}
          height={78}
        ></Image>
        <div className={styles.loading__tipBox__title}>코디 TIP!</div>
        <div className={styles.loading__tipBox__contents}>{loadingTexts[getRandomNumber(loadingTexts.length - 1)]}</div>
      </div>
    </div>
  );
};

export default Loading;
