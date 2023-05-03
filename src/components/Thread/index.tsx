import React, { useEffect } from 'react';
import { TITLE_THREAD } from '../../constants';
import { WorkBoxLayout } from '../WorkBoxLayout';
import { useWebWorker } from '../../hooks/useWebWorker';

export function Thread() {
  const { startComputed } = useWebWorker();
  const isThread = true;

  const otherComputed = () => {
    for (let i = 0; i < 50_000; i += 1) {
      console.log('==========>i', i);
    }
  };

  useEffect(() => {
    if (isThread) {
      startComputed((otherComputed));
    } else {
      otherComputed();
    }
  }, []);

  return (
    <WorkBoxLayout title={TITLE_THREAD}>
      <div>
        WorkBox precache requests
      </div>
    </WorkBoxLayout>
  );
}
