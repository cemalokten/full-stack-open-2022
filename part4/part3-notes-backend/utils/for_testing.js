const reverse = (string) => string
  .split('')
  .reverse()
  .join('');

const average = (array) => {
  if (array.length === 0) return 0;
  const reducer = (sum, item) => sum + item;

  return array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
