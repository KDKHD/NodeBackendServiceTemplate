const fString = (s: string, args: [string | number]) => {
  let i = 0;
  return s.replace(/{}/g, () => {
    return typeof args[i] != 'undefined' ? String(args[i++]) : '';
  });
};

export { fString };
