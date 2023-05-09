self.addEventListener('message', ({ data }) => {
  // eslint-disable-next-line prefer-template, no-new-func
  const computed = new Function('return' + data)();
  const result = computed();
  postMessage(result);
});

export {};
