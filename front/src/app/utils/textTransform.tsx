export const formatTextUrl = (text: string): string => {
  let itemLink = text[0].toUpperCase() + text.slice(1, text.length);

  if (itemLink.includes("-")) {
    const words = itemLink.split("-");
    itemLink = words
      .map((word) => word[0].toUpperCase() + word.slice(1, word.length))
      .join(" ");
  }

  return itemLink;
};
