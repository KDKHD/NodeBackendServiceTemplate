const pgErrors = {
  isDuplicateKey: (e: any) => e.code == 23505,
};

export { pgErrors };
