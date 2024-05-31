
function createFrequencyCounter(arr) {
  return arr.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

function findMode(arr) {
  const freqCounter = createFrequencyCounter(arr);
  let maxCount = 0;
  let mostFrequent;

  for (const key in freqCounter) {
    if (freqCounter[key] > maxCount) {
      mostFrequent = key;
      maxCount = freqCounter[key];
    }
  }

  return Number(mostFrequent);
}

function convertAndValidateNumsArray(numsAsStrings) {
  const result = numsAsStrings.map((val, idx) => {
    const number = Number(val);
    if (isNaN(number)) {
      throw new Error(`The value '${val}' at index ${idx} is not a valid number.`);
    }
    return number;
  });

  return result;
}

function findMean(nums) {
  if (nums.length === 0) return 0;
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  return sum / nums.length;
}

function findMedian(nums) {
  nums.sort((a, b) => a - b);
  const middleIndex = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[middleIndex - 1] + nums[middleIndex]) / 2;
  } else {
    return nums[middleIndex];
  }
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray
};
