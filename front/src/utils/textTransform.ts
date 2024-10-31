export const formatUrlToText = (text: string, textLower?: boolean): string => {
  text = text.replace(/[0-9]+-/g, "");
  let itemLink = !textLower
    ? text[0].toUpperCase() + text.slice(1, text.length)
    : text;

  if (itemLink.includes("-")) {
    const words = itemLink.split("-");
    itemLink = !textLower
      ? words
          .map((word) => word[0].toUpperCase() + word.slice(1, word.length))
          .join(" ")
      : words.join(" ");
  }

  return itemLink;
};

export const formatTextToUrl = (text: string): string => {
  return text.toLowerCase().split(" ").join("-");
};
