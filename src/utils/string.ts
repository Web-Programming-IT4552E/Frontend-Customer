function truncateString(text: string, truncateLength: number = 10) {
  const truncatedText = text.substring(0, truncateLength) + '...' + text.substring(text.length - truncateLength);
  return truncatedText;
}

export {
  truncateString
}