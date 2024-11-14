import React from 'react';
import styles from '../styles/progressBar.module.scss';
type stepsType = {
  id: number;
  name: string;
};
type progressBarType = {
  currentId: number;
};
const ProgressBar = ({ currentId }: progressBarType) => {
  const steps: stepsType[] = [
    {
      id: 0,
      name: '성별',
    },
    {
      id: 1,
      name: '어깨',
    },
    {
      id: 2,
      name: '승모근',
    },
    {
      id: 3,
      name: '골반',
    },
    {
      id: 4,
      name: '대퇴골',
    },
    {
      id: 5,
      name: '허리',
    },
  ];
  function getLabelClassName(id: number) {
    if (id < currentId) {
      return 'visited';
    } else if (id === currentId) {
      return 'current';
    } else if (id > currentId) {
      return 'notVisited';
    }
  }
  return (
    <div className={styles.progressBar}>
      {steps.map((item, index) => (
        <div key={item.id} className={styles.stepBox}>
          <div className={`${styles.label} ${styles[`label__${getLabelClassName(item.id)}`]}`}></div>
          <div className={styles.text}>{item.name}</div>
          {index < steps.length - 1 && (
            <div className={`${styles.line} ${item.id < currentId ? styles.line__visited : ''}`}></div>
          )}
        </div>
      ))}
      {/* <div className={styles.line}></div> */}
    </div>
  );
};

export default ProgressBar;
