import React, {
  FC, ReactNode, useContext,
} from 'react';
import clsx from 'clsx';
import { RouterContext } from '../../Router';
import {
  WORK_BOX_PRECACHE_IMAGE,
  WORK_BOX_PRECACHE_REQUESTS,
  BACKGROUND_SYNC, INDEX_DB,
} from '../../Router/paths';
import {
  TITLE_WORK_BOX_PRECACHE_IMAGE,
  TITLE_WORK_BOX_PRECACHE_REQUESTS,
  TITLE_BACKGROUND_SYNC,
  TITLE_INDEX_DB,
} from '../constants';

import styles from './styles.module.scss';

interface IProp {
    children: ReactNode
    title: string
}

const links = [
  {
    link: WORK_BOX_PRECACHE_IMAGE,
    title: TITLE_WORK_BOX_PRECACHE_IMAGE,
  },
  {
    link: WORK_BOX_PRECACHE_REQUESTS,
    title: TITLE_WORK_BOX_PRECACHE_REQUESTS,
  },
  {
    link: BACKGROUND_SYNC,
    title: TITLE_BACKGROUND_SYNC,
  },
  {
    link: INDEX_DB,
    title: TITLE_INDEX_DB,
  },
];

export const WorkBoxLayout:FC<IProp> = ({ children, title }) => {
  const { routerNavigate } = useContext(RouterContext);

  // подумать как лучше сделать анимацию
  return (
    <div className={clsx(styles.container, styles.animate)}>
      <nav className={styles.menu}>
        {links.map(({ link, title: linkTitle }) => (
          <button className={styles.button} key={`${linkTitle}-${link}`} onClick={() => routerNavigate(link)}>{linkTitle}</button>
        ))}
      </nav>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};
