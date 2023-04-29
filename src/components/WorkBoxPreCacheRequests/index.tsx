import React from 'react';
import { TITLE_WORK_BOX_PRECACHE_REQUESTS } from '../../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';

export function WorkBoxPreCacheRequests() {
  return (
    <WorkBoxLayout title={TITLE_WORK_BOX_PRECACHE_REQUESTS}>
      <div>
        WorkBox precache requests
      </div>
    </WorkBoxLayout>
  );
}
