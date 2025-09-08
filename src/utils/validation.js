export const isEmpty = (text) => {
  // Check if text is null, undefined, or not a string
  if (text === null || text === undefined || typeof text !== "string") {
    return true;
  }

  // Trim spaces and check if empty
  if (text.trim() === "") {
    return true;
  }

  return false;
};
