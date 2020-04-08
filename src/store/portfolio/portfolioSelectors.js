import { createSelector } from 'reselect';
import {getTotalPercentage} from '../../helpers/fundValueCalculator';
import {colors} from '../../constants';

const portfolioSelector = portfolioData => portfolioData;

// export const selectBrainsFunds = createSelector(
//   portfolioSelector,
//   portfolioData => {
//     if (portfolioData && portfolioData.brains_funds) {
//       const {brains_funds} = portfolioData;
//       for (let fund in brains_funds) {
//         brains_funds[fund].isOpened = brains_funds[fund].positionByTailoring === 1;
//         brains_funds[fund].color = colors[fund-1];
//       }
//       return brains_funds;
//     }
//     return null;
//   }
// );

export const selectAllowedPercentage = createSelector(
  portfolioSelector,
  ({data, fundsData}) => {
    if (data && data.bf_contribution && fundsData) {
      return data.bf_contribution === getTotalPercentage(fundsData);
    }
    return false;
  }
);

export const selectBrainsFunds = createSelector(
  portfolioSelector,
  fundsData => {
    if (fundsData) {
      for (let fund in fundsData) {
        fundsData[fund].color = colors[fund-1];
        // fundsData[fund].disabled = data.bf_contribution !== getTotalPercentage(fundsData);
      }
      Object.values(fundsData).sort((a, b) => b.tailored - a.tailored).forEach((item, index) => {
        item.positionByTailoring = index+1;
      });
      Object.values(fundsData).sort((a, b) => b.recommended - a.recommended).forEach((item, index) => {
        item.positionByRecommended = index+1;
      });
      return fundsData;
    }
    return null;
  }
);

export const selectInterestsData = createSelector(
  portfolioSelector,
  portfolioData => {
    if (portfolioData && portfolioData.interest_funds) {
      const {interest_funds} = portfolioData;

      return interest_funds;
    }
    return null;
  }
);

export const selectData = createSelector(
  portfolioSelector,
  portfolioData => {
    if (portfolioData.data) {
      return portfolioData.data[portfolioData.prop];
    }
    return null;
  }
);
