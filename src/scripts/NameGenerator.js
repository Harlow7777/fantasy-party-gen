import {maleNames} from '../input/input_male.js';

function getMaxLength(dict) {
  var length = 0;
  for(var i = 0; i < dict.length; i++) {
    if(dict[i].length > length) length = dict[i].length;
  }
 return length;
}

function calculateLetterPairsFrequency() {
    let pairProbabilityTableOccurences = new Map();
    let totalPairs = 0;

  // Count letter pairs in the array of strings
  maleNames.forEach(str => {
    for (let i=0; i < str.length - 1; i++) {
      const pair = str.slice(i, i + 2);
      pairProbabilityTableOccurences.set(pair, (pairProbabilityTableOccurences.get(pair) || 0) + 1);
      if(pairProbabilityTableOccurences.get(pair) == 1) {
        totalPairs++;
      }
    }
  });

  let pairProbabilityTable = new Map();
  let maxFrequency = 0;
  // Calculate frequencies as percentages
  for (const [pair, occurences] of pairProbabilityTableOccurences) {
    let freq = occurences / totalPairs;
    pairProbabilityTable.set(pair, freq);
    maxFrequency = freq > maxFrequency ? freq : maxFrequency;
  }

  // console.log("pairProbabilityTable ", pairProbabilityTable);
  return [pairProbabilityTable, maxFrequency];
};

function calculateLetterTripletsFrequency() {
  let tripletProbabilityTableOccurences = new Map();
  let totalTriplets = 0;

  // Count letter triplets in the array of strings
  maleNames.forEach(str => {
    for (let i = 0; i < str.length - 2; i++) {
      const triplet = str.slice(i, i + 3);
      tripletProbabilityTableOccurences.set(triplet, (tripletProbabilityTableOccurences.get(triplet) || 0) + 1);
      if(tripletProbabilityTableOccurences.get(triplet) == 1) {
        totalTriplets++;
      }
    }
  });

  let tripletProbabilityTable = new Map();
  let maxFrequency = 0;
  // Calculate frequencies as percentages
  for (const [triplet, occurences] of tripletProbabilityTableOccurences) {
    let freq = occurences / totalTriplets;
    tripletProbabilityTable.set(triplet, freq);
    maxFrequency = freq > maxFrequency ? freq : maxFrequency;
  }
  
  // console.log("tripletProbabilityTable ", tripletProbabilityTable);
  return [tripletProbabilityTable, maxFrequency];
};

// Returns probability table and max frequency
function calculateFirstLetterFrequency() {
    let firstLetterProbabilityTableOccurences = new Map();
    let totalFirstLetters = 0;
  
    // Count occurences of starting letters from each string
    maleNames.forEach(str => {
        let firstLetter = str[0];
        firstLetterProbabilityTableOccurences.set(firstLetter, (firstLetterProbabilityTableOccurences.get(firstLetter) || 0) + 1);
        if(firstLetterProbabilityTableOccurences.get(firstLetter) == 1) {
            totalFirstLetters++;
        }
    });
  
    let firstLetterProbabilityTable = new Map();
    let maxFrequency = 0;
    // Calculate frequencies as percentages
    for (const [letter, occurences] of firstLetterProbabilityTableOccurences) {
        let freq = occurences / totalFirstLetters
        firstLetterProbabilityTable.set(letter, (freq));
        maxFrequency = freq > maxFrequency ? freq : maxFrequency;
    }

    return [firstLetterProbabilityTable, maxFrequency];
  };

function name() {
  const maxLength = getMaxLength(maleNames);

  let pairProbabilityTable = calculateLetterPairsFrequency();
  let tripletProbabilityTable = calculateLetterTripletsFrequency();
  let firstLetterProbabilityTable = calculateFirstLetterFrequency();

  // Running main test
  const nameLength = Math.floor(Math.random() * (maxLength-3) + 3);
  var name = getStartingLetter(firstLetterProbabilityTable);

  for (let i = 0; i < nameLength; i++) {
    let prevLetter = name[name.length - 1];
    let nextLetter = '';
    if(i > 0) {
        let prevLetters = name.substring(name.length - 2);
        console.log("sending prevLetters ", prevLetters);
        nextLetter = getNextLetter(pairProbabilityTable, tripletProbabilityTable, prevLetters).toLowerCase();
    } else {
        console.log("sending prevLetter ", prevLetter);
        nextLetter = getNextLetter(pairProbabilityTable, tripletProbabilityTable, prevLetter).toLowerCase();
    }
    console.log("Received nextLetter ", nextLetter);
    name += nextLetter;
  }

  console.log("Generated name ", name);
  return name;
}

function getStartingLetter(firstLetterProbabilityTable) {
  const rand = Math.random() * firstLetterProbabilityTable[1];

  let filteredAndSortedLetters = Array.from(firstLetterProbabilityTable[0]).filter(([key, value]) => value >= rand).sort((a, b) => b[1] - a[1]);

  let startingLetter = filteredAndSortedLetters[filteredAndSortedLetters.length - 1][0];

  console.log("Generated starting letter ", startingLetter);
  return startingLetter;
}

function getNextLetterRandom(pairProbabilityTable) {
    const rand = Math.random() * pairProbabilityTable[1];
    let filteredAndSortedPairs = Array.from(pairProbabilityTable[0]).filter(([key, value]) => value >= rand).sort((a, b) => b[1] - a[1]);

    let nextLetter = filteredAndSortedPairs[filteredAndSortedPairs.length - 1][0][0];

    return nextLetter;
}

//Fix triplets in the case of a pattern match
function getNextLetter(pairProbabilityTable, tripletProbabilityTable, prevLetter) {
    prevLetter = prevLetter.toLowerCase();
    const tripletRand = Math.random() * tripletProbabilityTable[1];
    const pairRand = Math.random() * pairProbabilityTable[1];

    // First check triplet patterns
    let filteredAndSortedTriplets = new Map();
    // if we are on the first letter, check whether its at index 0 or 1, then get the next letter in the sequence
    if(prevLetter.length == 1) {
        filteredAndSortedTriplets = Array.from(tripletProbabilityTable[0])
          .filter(([key, value]) => key[0].toLowerCase() == prevLetter || key[1].toLowerCase() == prevLetter)
          .filter(([key, value]) => value >= tripletRand)
          .sort((a, b) => b[1] - a[1]);
        if(filteredAndSortedTriplets.length != 0) {
            console.log("filteredAndSortedTriplets based on prevLetter " + prevLetter);
            console.log(filteredAndSortedTriplets);
            let lastTripletFromList = filteredAndSortedTriplets[filteredAndSortedTriplets.length - 1][0].toLowerCase();
            return lastTripletFromList[lastTripletFromList.indexOf(prevLetter) + 1][0];
        }
    // if we have a pair, check whether its the first two in the triplet, then get the last letter
    } else {
        filteredAndSortedTriplets = Array.from(tripletProbabilityTable[0])
          .filter(([key, value]) => key.toLowerCase().indexOf(prevLetter) == 0)
          .filter(([key, value]) => value >= tripletRand)
          .sort((a, b) => b[1] - a[1]);
        if(filteredAndSortedTriplets.length != 0) {
          console.log("filteredAndSortedTriplets based on prevLetter " + prevLetter);
          console.log(filteredAndSortedTriplets);
          return filteredAndSortedTriplets[filteredAndSortedTriplets.length - 1][0][2];
        }
    }

    // Check if the letter appears in any pairs
    let filteredAndSortedPairs = Array.from(pairProbabilityTable[0])
      .filter(([key, value]) => key[0].toLowerCase() == prevLetter)
      .filter(([key, value]) => value >= pairRand)
      .sort((a, b) => b[1] - a[1]);

    if(filteredAndSortedPairs.length != 0) {
        console.log("filteredAndSortedPairs based on prevLetter ", prevLetter);
        console.log(filteredAndSortedPairs);
        console.log("Grabbing last element's second char ", filteredAndSortedPairs[filteredAndSortedPairs.length - 1][0][1]);
        return filteredAndSortedPairs[filteredAndSortedPairs.length - 1][0][1];
    }

    if(prevLetter.length == 2) {
      console.log("looping with ", prevLetter[1]);
      return getNextLetter(pairProbabilityTable, tripletProbabilityTable, prevLetter[1]);
    }

    // Default to a random letter if not found in any of the probability tables
    return getNextLetterRandom(pairProbabilityTable);
}

function getLastLetter() {
    // create pairs and triplets with spaces at the end signifying they are the end of a name
}

export default name;