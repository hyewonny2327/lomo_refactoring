'use client';
import React, { ChangeEvent } from 'react';
import styles from '../styles/slider.module.scss';

interface SliderProps {
  value: number;
  setValue: (value: number) => void;
}

const Slider = ({ value, setValue }: SliderProps) => {
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className={styles.slider}>
      <input
        type="range"
        min="0"
        max="4"
        step="1"
        value={value}
        className={styles.sliderInput}
        onChange={handleSliderChange}
      />
      <div className={styles.sliderTrack}>
        <div className={styles.sliderProgress} style={{ width: `${(value / 4) * 100}%` }}></div>
      </div>
    </div>
  );
};

export default Slider;
