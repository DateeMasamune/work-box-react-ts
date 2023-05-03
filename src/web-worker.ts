self.addEventListener('message', ({ data }) => {
  // eslint-disable-next-line prefer-template, no-new-func
  const cumputed = new Function('return' + data)();
  cumputed();
  postMessage('result');
});

export {};
