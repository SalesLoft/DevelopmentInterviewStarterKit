import { getCharacterFrequencies } from './DetailsModal';

let testData = 'hello',
  testResult = getCharacterFrequencies(testData);

it('Includes the highest frequencies first', () => {
  let currentHighestFrequencyValue = testResult[0][1],
    isOrderedDescendingFrequency = true;

  testResult.forEach(([char, currentFrequencyValue]) => {
    if (currentHighestFrequencyValue < currentFrequencyValue) {
      isOrderedDescendingFrequency = false;
    }
    else {
      currentHighestFrequencyValue = currentFrequencyValue;
    }
  });

  expect(isOrderedDescendingFrequency).toEqual(true);
});

it('Counts the frequencies correctly', () => {
  const getCharFreq = char => testResult.filter(([character, freq]) => character === char)[0][1];
  expect(getCharFreq('h')).toBe(1);
  expect(getCharFreq('l')).toBe(2);
  expect(getCharFreq('e')).toBe(1);
  expect(getCharFreq('o')).toBe(1);
});

it('Counts only the unique characters', () => {
  expect(testResult.length).toBe(4);
});
