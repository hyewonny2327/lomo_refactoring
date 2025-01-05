import React from 'react';
import Image from 'next/image';
import styles from '../styles/selectTrapezius.module.scss';

interface SelectTrapeziusProps {
  setValue: (value: number) => void;
}
const SelectTrapezius = ({ setValue }: SelectTrapeziusProps) => {
  function handleSelectOption(type: string) {
    if (type === 'hasTrapezius') {
      console.log('click');
      setValue(1);
    } else if (type === 'notHasTrapezius') {
      setValue(0);
    }
  }
  return (
    <div className={styles.selectTrapezius__imageContainer}>
      <Image
        className={styles.selectTrapezius__image}
        src="/hasTrapezius.svg"
        alt="manIcon"
        width={90}
        height={90}
        onClick={() => handleSelectOption('hasTrapezius')}
      />
      <Image
        className={styles.selectTrapezius__image}
        src="/noTrapezius.svg"
        alt="womanIcon"
        width={90}
        height={90}
        onClick={() => handleSelectOption('notHasTrapezius')}
      />
    </div>
  );
};

export default SelectTrapezius;
