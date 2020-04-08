
export const trimFieldsData = data => {
  const newData = {};
  for (let field in data) {
    if (typeof data[field] === 'string') {
      newData[field] = data[field].trim();
    } else {
      newData[field] = data[field];
    }
  }
  return newData;
};

export const generateHash = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const splitStringMainLetter = (str, separator = '_') => {
  const arr = str.split(separator);
  arr.forEach((word, index) => {
    arr[index] = word[0].toUpperCase() + word.slice(1);
  });
  return arr.join(' ');
};

export const mobileAndTabletCheck = () => {
  if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
  } else {
    return false;
  }
};

export const getSliderHandleWidth = val => {
  if (window.innerWidth < 575) {
    const percent = 100 - ((50 / (window.innerWidth - 100)) * 100);
    const rounded = Math.round(percent);
    const horRest = Math.round((100 - rounded)/2);
    return `${((val/100) * rounded) + horRest}%`;
  }
  return `${((val/100) * 80) + 10}%`;
};
