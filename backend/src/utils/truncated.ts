const truncated = (name: string, max: number = 240) => {
  const maxLength = max;
  const truncated = name.length > maxLength ? name.slice(0, maxLength) : name;
  return truncated;
};

export default truncated;
