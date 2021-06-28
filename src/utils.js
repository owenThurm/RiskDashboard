export const sma = (priceData, length) => {
  const sma = Array(length).fill(null);

  let value = priceData.slice(0, length).reduce((acc, val) => {
    return acc + val;
  }, 0);

  let pointer1 = 0;
  let pointer2 = length;

  while (pointer2 < priceData.length) {
    value += priceData[pointer2] - priceData[pointer1];
    sma.push(value/length);
    pointer1++;
    pointer2++;
  }

  return sma;
};

export const riskMetric = priceData => {
  const riskMetric = [];
  const yearSMA = sma(priceData, 365).slice(365, priceData.length);
  const choppedPriceData = priceData.slice(365, priceData.length);

  if (yearSMA.length !== choppedPriceData.length) {
    console.log(yearSMA, priceData)
    console.log(`SMA of length ${yearSMA.length} doesn't match price data of length ${priceData.length}`);
  }

  let pointer = 0;

  while (pointer < yearSMA.length) {
    let price = choppedPriceData[pointer];
    let smaVal = yearSMA[pointer];
    let riskVal = (price - smaVal)/smaVal*100;
    riskMetric.push(riskVal);
    pointer++;
  }

  let min_risk = Math.min(...riskMetric);

  pointer = 0;

  while (pointer < riskMetric.length) {
    riskMetric[pointer] = Math.sqrt(riskMetric[pointer] + Math.abs(min_risk));
    pointer++;
  }

  const max_risk = Math.max(...riskMetric);
  min_risk = Math.min(...riskMetric);

  pointer = 0;

  while(pointer < riskMetric.length) {
    riskMetric[pointer] = (riskMetric[pointer] - min_risk) / max_risk;
    pointer++;
  }

  let spacerArray = Array(365).fill(null);

  spacerArray.push(...riskMetric);

  return spacerArray;
}