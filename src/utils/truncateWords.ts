export const truncateMessage = (message: string) => {
  if (!message) return "";

  const firstWord = message.split(" ")[0];
  return `${firstWord}...`;
};
