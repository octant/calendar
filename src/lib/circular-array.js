export const circularArray = array => {
  return index => {
    return array[index % array.length];
  };
};
