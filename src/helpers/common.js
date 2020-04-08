import {globals} from "../store/globals";
import { DEEP_PORTFOLIO, EXPERT_PORTFOLIO, EXPRESS_PORTFOLIO, WORLD_VIEW } from "../navigation/routes";
import {colors} from '../constants';

export const getUrlParam = index => {
  if (globals) {
    const arr = globals.history.location.pathname.split('/');
    return arr[index];
  }
  return null;
};

export const getRouteWV = currentQuiz => {
  switch (currentQuiz) {
    case 'expert':
      return EXPERT_PORTFOLIO;
    case 'express':
      return EXPRESS_PORTFOLIO;
    case 'deep_dive':
      return DEEP_PORTFOLIO;
    default:
      return WORLD_VIEW;
  }
};

export const getQuizTitle = quizType => {
  switch (quizType) {
    case 'expert':
      return 'Experts';
    case 'express':
      return 'Express';
    case 'deep_dive':
      return 'Deep Dive';
    default:
      return '';
  }
};

export const filterActionsForRequest = actionType => {
  const isRequestAction = actionType.includes('REQUEST');
  if (isRequestAction) {
    const isNoToken = actionType.includes('TOKEN');
    if (!isNoToken) {
      return actionType;
    }
    return null;
  }
  return null;
};

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getChartDataFromFunds = (data, type) => {
  // const {brains_funds} = data;
  const chartData = {};
  //const colorSchema = [];
  const dataSet = [];
  const positions = {
    tailored: 'positionByTailoring',
    recommended: 'positionByRecommended',
  };
  Object.values(data).forEach(item => {
    const obj = {
      quantity: item[type],
      name: item.name,
      percentage: item[type],
      id: item[positions[type]],
    };
    dataSet.push(obj);
    //colorSchema.push(color);
  });
  chartData.colorSchema = colors;
  chartData.dataSet = dataSet;
  return chartData;
};
