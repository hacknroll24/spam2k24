export function getKeyOfLargestValue(dict) {
  let maxKey = null;
  let maxValue = Number.NEGATIVE_INFINITY;

  for (const [key, value] of Object.entries(dict)) {
    if (value > maxValue) {
      maxKey = key;
      maxValue = value;
    }
  }

  if (maxKey !== null) {
    return maxKey;
  }

  // Return null if the object is empty
  return null;
}
