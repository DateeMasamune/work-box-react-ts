import React from 'react';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { TITLE_PAGE_OFFLINE } from '../../constants';

export const Offline = () => (
  <WorkBoxLayout title={TITLE_PAGE_OFFLINE}>
    <div>
      Отсутствует соединение с интернетом
    </div>
  </WorkBoxLayout>
);
