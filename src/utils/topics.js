const getRandomTopics = (arr, quantity) => {
  return [...arr].sort(() => Math.random() - Math.random()).slice(0, quantity);
};

export { getRandomTopics };
