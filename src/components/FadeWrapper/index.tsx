import React, { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IProp {
    children: ReactNode
}

export const FadeWrapper:FC<IProp> = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);
