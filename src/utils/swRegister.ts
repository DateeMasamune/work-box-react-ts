export const swRegister = () => {
  window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./service-worker.js');
        console.log('==========>serviceWorker registe success');
      } catch (error) {
        console.log('==========>serviceWorker registe error', error);
      }
    }
  });
};
