const generateID = () => {
  const rdn = (n: number) => Math.floor(Math.random() * n);
  const _64Caracteres =
    "_-0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
  const len = _64Caracteres.length;

  let id = "";
  for (let i = 0; i < 6; i++) {
    id += _64Caracteres[rdn(len)];
  }
  return id;
};

export { generateID };
