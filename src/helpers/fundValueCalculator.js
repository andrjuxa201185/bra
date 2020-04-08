const round = val => {
  let value = val < 0 ? val*-1 : val;
  return val < 0 ? - Math.round(value * 100) / 100 : Math.round(value * 100) / 100;
};

// Explanation: Employer's algorithm doesn't consider case when we have one fund with 100 percents and other funds with zero
// because of that we need to lock decrement button, as we know from the documentation if we press decrement button we have to split rest percentage for all availables (not zero) funds
export const lockDecrButton = (tailored, data, id) => {
  let availableFunds = 0;
  Object.values(data).forEach(item => {
    if (!(item.is_locked || item.tailored === 0 || item.id === id)) {
      availableFunds = availableFunds+ 1;
    }
  });
  if (!availableFunds) {
    return true;
  }
  return tailored - 1 < 0;
};

export const lockIncrButton = (tailored, data) => {
  let adjustPercentage = 0;
  Object.values(data).forEach(item => {
    if (!(item.is_locked || item.tailored === 0)) {
      adjustPercentage = round(adjustPercentage + item.tailored);
    }
  });
  return tailored + 1 > adjustPercentage;
};

export const calculate = (isIncr, fundId, fundsData) => {
  const val = isIncr ? 1 : -1;
  let adjustPercentage = 0;
  let rest = val;
  let minFundValue = {val:100, id: null};

  const isAvailableForChange = item => {
    return !(item.is_locked || item.tailored === 0 || item.id === fundId);
  };

  fundsData[fundId].tailored = round(fundsData[fundId].tailored + val);
  //calculation adjustPercentage
  Object.values(fundsData).forEach(item => {
    if (isAvailableForChange(item)) {
      adjustPercentage = round(adjustPercentage + item.tailored);
    }
  });
  // calculation funds value
  for (let fund in fundsData) {
    if (isAvailableForChange(fundsData[fund])) {
      const {tailored} = fundsData[fund];
      let change = -tailored * val / adjustPercentage;
      fundsData[fund].tailored = round(fundsData[fund].tailored + round(change));
      rest = rest + round(change);
    }
  }
  //calculation minFundValue
  if (rest !== 0) {
    for (let fund in fundsData) {
      if (isAvailableForChange(fundsData[fund])) {
        minFundValue = fundsData[fund].tailored < minFundValue.val ? {val: fundsData[fund].tailored, id: Number(fund)} : minFundValue;
      }
    }
    if (minFundValue.id) {
      fundsData[minFundValue.id].tailored = round(fundsData[minFundValue.id].tailored - round(rest));
    }
  }

  // console.log('minFundValue', minFundValue);
  // console.log('rest', round(rest));
  // console.log('fundsData', fundsData);
  return fundsData;
};

export const getTotalPercentage = fundsData => {
  let percentage = 0;
  Object.values(fundsData).forEach(item => {
    percentage = percentage + item.tailored;
  });

  return percentage;
};

export const setFundData = (fundId, val, fundsData, bfContributions) => {

  // const data = new Map();
  // Object.values(fundsData).forEach(item => {
  //   data.set(item.id, item);
  // });
  fundsData[fundId].tailored = val;
  for (let fund in fundsData) {
    fundsData[fund].disabled = bfContributions !== getTotalPercentage(fundsData);
  }
  // data.set(fundId, {
  //   ...data.get(fundId),
  //   tailored: val,
  //   disabled: bfContributions !== getTotalPercentage(fundId, val, fundsData),
  // });

  // const result = Array.from(data.values());
  
  return {
    newFundsData: fundsData,
    totalPercentage: getTotalPercentage(fundsData),
  };
};
