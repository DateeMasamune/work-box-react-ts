import React, { FC } from 'react';

import styles from './styles.module.scss';

interface IProp {
    quota: number
    usage: number
}

export const EstimateStorage:FC<IProp> = ({ quota, usage }) => (
  <div className={styles.container}>
    <span>
      {`Свободная память кеша: ${new Intl.NumberFormat().format(quota)} байт`}
    </span>
    <span>
      {`Использовано памяти кеша: ${new Intl.NumberFormat().format(usage)} байт`}
    </span>
  </div>
);
