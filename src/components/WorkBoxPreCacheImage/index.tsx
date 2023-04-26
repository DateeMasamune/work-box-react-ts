import React from 'react';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { TITLE_WORK_BOX_PRECACHE_IMAGE } from '../constants';

export function WorkBoxPreCacheImage() {
  return (
    <WorkBoxLayout title={TITLE_WORK_BOX_PRECACHE_IMAGE}>
      <div>
        WorkBox precache image
      </div>
    </WorkBoxLayout>
  );
}
