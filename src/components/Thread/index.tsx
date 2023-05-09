import React from 'react';
import { TITLE_THREAD } from '../../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { useWebWorker } from '../../hooks/useWebWorker';

import styles from './styles.module.scss';

const otherComputed = () => {
  console.log('==========>start...');
  const start = Date.now();
  const sum = Math.floor(Array.from({ length: 30_000_000 })
    .map(() => Math.random() * 5)
    .reduce((prev, curr) => prev + curr));
  const finish = (Date.now() - start);

  console.log('==========>sum==============', { sum, finish });

  return {
    sum,
    finish,
  };
};

export function Thread() {
  const { startComputed } = useWebWorker();

  return (
    <WorkBoxLayout title={TITLE_THREAD}>
      <div className={styles.threadWrapper}>
        <button onClick={otherComputed}>
          Вычисления в общем потоке
        </button>
        <button onClick={() => startComputed(otherComputed)}>
          Вычисления в другом потоке
        </button>
      </div>
    </WorkBoxLayout>
  );
}
