import { useState, useCallback } from 'react';

export const useWebWorker = () => {
  const [result, setResult] = useState();

  const startComputed = useCallback((computed: () => void) => {
    const worker = new Worker(new URL('../web-worker.ts', import.meta.url));
    worker.postMessage(computed.toString());

    worker.onmessage = (event) => {
      console.log('==========>@@@@@@@@@@@@@@@@@event webWorker', event.data);
      setResult(event.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      console.log('==========>@@@@@@@@@@@@@@@@@event webWorker error', error.message);
    };
  }, [setResult]);

  return { result, startComputed };
};
