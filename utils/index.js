export const sliceText = (text, size) => {
  if (!text) {
    return '';
  }
  const length = text.length;
  if (length <= size || size <= 4) {
    return text;
  } else {
    return text.slice(0, size - 4) + '...';
  }
};
