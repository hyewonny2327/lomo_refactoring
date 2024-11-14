'use client';
import React, { useState, ChangeEvent } from 'react';
import styles from '../styles/slider.module.scss';

const Slider: React.FC = () => {
  const [value, setValue] = useState<number>(0); // 슬라이더 값을 상태로 관리

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={styles.slider}>
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={value}
        className={styles.sliderInput}
        onChange={handleSliderChange}
      />
      <div className={styles.sliderTrack}>
        <div className={styles.sliderProgress} style={{ width: `${(value / 5) * 100}%` }}></div>
      </div>
    </div>
  );
};

export default Slider;
