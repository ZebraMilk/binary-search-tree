function createSampleSet(elements, maxValue) {
  // populate a Set with up to maxValue elements
  // random number generator, sorta

  let arr = [];
  let sampleSet = new Set([...arr]);
  return sampleSet;
}

function createSimpleSample(maxValue) {
  let simpleSample = [];
  for (let i = 0; i < maxValue; i++) {
    simpleSample[i] = i + 1;
  }
  return simpleSample;
}

export default { createSampleSet, createSimpleSample };
