import React from 'react';
import { TITLE_BACKGROUND_SYNC } from '../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';

export function BackgroundSync() {
  return (
    <WorkBoxLayout title={TITLE_BACKGROUND_SYNC}>
      <div>
        Background sync
      </div>
    </WorkBoxLayout>
  );
}
