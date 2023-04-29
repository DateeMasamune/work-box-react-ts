import React from 'react';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { TITLE_WORK_BOX_PRECACHE_IMAGE } from '../../constants';

import styles from './styles.module.scss';

const images = [
  '/assets/itachi.jpg',
  '/assets/l.jpg',
  '/assets/madara.jpg',
  '/assets/ryk.jpg',
  '/assets/sangoku.jpg',
  '/assets/sasuke.jpg',
  '/assets/sekiro.jpg',
];

export function WorkBoxPreCacheImage() {
  return (
    <WorkBoxLayout title={TITLE_WORK_BOX_PRECACHE_IMAGE}>
      <div>
        {images.map((image) => <img key={image} className={styles.image} src={image} alt="" />)}
      </div>
    </WorkBoxLayout>
  );
}
