function getCharacterFrequencies(string) {
  // Get a map of all unique characters that appear in the provided string,
  // and map each character to the number of times it appears in the provided string
  let uniqueChars = {};
  string.split('').forEach(char => {
    if (typeof uniqueChars[char] !== 'undefined') {
      uniqueChars[char]++;
    }
    else {
      uniqueChars[char] = 1;
    }
  });

  // Create and return an array of characters paired with the frequency in which they
  // appear in the provided string in descending order regarding their frequencies
  let result = [];
  Object.keys(uniqueChars)
  .sort((a, b) => uniqueChars[b] - uniqueChars[a])
  .forEach(char => {
    result.push([char, uniqueChars[char]]);
  });
  return result;
}
