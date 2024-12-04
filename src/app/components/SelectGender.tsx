import React from 'react';
import Image from 'next/image';
import styles from '../styles/selectGender.module.scss';
const SelectGender = () => {
  return (
    <div className={styles.selectGender__imageContainer}>
      <div className={styles.selectGender__individualImage}>
        <Image className={styles.selectGender__image} src="/man.svg" alt="manIcon" width={147} height={160} />
        <div className={styles.selectGender__text}>남</div>
      </div>
      <div className={styles.selectGender__individualImage}>
        <Image className={styles.selectGender__image} src="/woman.svg" alt="womanIcon" width={147} height={160} />
        <div className={styles.selectGender__text}>여</div>
      </div>
    </div>
  );
};

export default SelectGender;
