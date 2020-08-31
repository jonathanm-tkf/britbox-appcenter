/* eslint-disable no-bitwise */
/* eslint-disable arrow-body-style */
import timezone from './timezone';
import Latinize from './latinize';
import constants from './constants';

export const isEmpty = val => {
  if (typeof val === 'undefined') {
    return true;
  }
  if (val !== null && typeof val === 'object') {
    if (Object.keys(val).length > 0 && Object.keys(val)[0] === '') return true;
    return Object.keys(val).length === 0;
  }
  return val === null || val.trim() === '';
};

export const isNull = val => val === null;

export const isUndefined = val => typeof val === 'undefined';

function isNumeric(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

function isValidTimestamp(timestamp) {
  const newTimestamp = new Date(timestamp).getTime();
  return isNumeric(newTimestamp) && timestamp.toString().length === 13;
}

export const isDate = val => isValidTimestamp(val);

export const getCookie = cname => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
};

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days && !isDate(days)) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  } else {
    const date = new Date(days);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};
export const setCookieAuthKey = (name, value, date) => {
  let expires = '';


  // console.log('Lo que llega = ', date);

  const dateUTC = new Date(Number(date)); 

  // console.log('Fecha => ', dateUTC);

  expires = `; expires=${dateUTC.toUTCString()}`;

  // console.log('SetCookieAuthKey = ', expires)


  // console.log('COOKIE = ', `${name}=${value || ''}${expires}; path=/`);
 
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const cookieValuesToObject = value => {
  const cookieObject = {};
  const cookieData = value.split('&');
  for (let i = 0; i < cookieData.length; i++) {
    const separatorIndex = cookieData[i].indexOf('=');
    const cookie = cookieData[i];
    cookieObject[cookie.substring(0, separatorIndex)] = cookie.substring(
      separatorIndex + 1,
      cookie.length
    );
  }
  return cookieObject;
};

export const defaultLangCountry = () => {
  let langCountryObject = {};
  if (document.location.hostname.indexOf('/ca') > 0) {
    langCountryObject = {
      Country: 'CA',
      Lang: 'US'
    };
  } else {
    langCountryObject = {
      Country: 'US',
      Lang: 'US'
    };
  }

  return langCountryObject;
};

export const { Lang, Country, CableOperator } = isEmpty(
  cookieValuesToObject(getCookie('SessionSettings'))
)
  ? defaultLangCountry()
  : cookieValuesToObject(getCookie('SessionSettings'));

export const compare = (a, b, property) => {
  if (a[property] < b[property]) return -1;
  if (a[property] > b[property]) return 1;
  return 0;
};

export const shareLinks = callback => {
  const shareButton = document.querySelectorAll('button.shareButton');
  if (shareButton.length > 0) {
    for (let index = 0; index < shareButton.length; index++) {
      if (shareButton[index].classList.contains('main')) {
        shareButton[index].addEventListener('click', () => {
          for (let i = 0; i < shareButton.length; i++) {
            shareButton[i].classList.toggle('open');
          }
        });
      }
    }
    if (callback) {
      callback();
    }
  }
};

let isScrollable = true;

export const Scrollable = {
  enabled: () => {
    isScrollable = true;
  },
  disabled: () => {
    isScrollable = false;
  }
};

export const isPromise = value =>
  value !== undefined && value !== null && typeof value.length === 'function';

export const silencePromise = value => {
  if (isPromise(value)) {
    value.then(null, e => {});
  }
};

export const ajaxGeneralApi = (url, method) => {
  try {
    return (
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error:', error))
        .then(response => response)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const getUrlImageStatic = asset =>
  `${constants[constants.environment].cloudfrontStatic + asset}`;

export const isFunction = possibleFunction => typeof possibleFunction === typeof Function;

const listenerScroll = function(e) {
  if (!isScrollable) {
    e.preventDefault();
  }
};

export const getUrlVars = url => {
  let hash;
  const myJson = {};
  const hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
    // If you want to get in native datatypes
    // myJson[hash[0]] = JSON.parse(hash[1]);
  }
  return myJson;
};

export const getPathURL = url => `/${Country.toLowerCase()}${url}`;

const removeUrlSpecialCharacters = string => string.latinize().replace(/[^a-zA-Z0-9-_]/g, '-');

export const calculateSizeImage = (url, imageType, quality = 0, height=0, width =0) => {
  let resImageURL = url;

  try {
    const { Height, Width, Quality } = getUrlVars(url);
    const originalHeight = parseInt(Height, 10);
    const originalWidth = parseInt(Width, 10);
    const originalQuality = parseInt(Quality, 10);

    let boxHeight = 0;
    let boxWidth = 0;
    let boxQuality = 85;
    switch (imageType) {
      case 'poster':
        boxHeight = 350;
        boxWidth = 250;
        boxQuality = 80;
        break;
      case 'tile':
        boxHeight = 210;
        boxWidth = 405;
        boxQuality = 80;
        break;
      case 'wallpaper':
        boxHeight = 240;
        boxWidth = 480;
        boxQuality = 80;
        break;
      case 'hero':
        boxHeight = 600;
        boxWidth = 1600;
        boxQuality = 80;
        break;
      case 'square':
        boxHeight = 500;
        boxWidth = 500;
        boxQuality = 80;
        break;
      default:
        boxHeight = 400;
        boxWidth = 600;
        boxQuality = 80;
        break;
    }
    if (quality !== 0) {
      boxQuality = quality;
    }
    if (height !== 0) {
      boxHeight = height;
    }
    if (width !== 0) {
      boxWidth = width;
    }
    const scaleHeight = parseFloat(boxHeight, 10) / parseFloat(originalHeight, 10);
    const scaleWidth = parseFloat(boxWidth) / parseFloat(originalWidth);
    const scale = Math.max(scaleHeight, scaleWidth);
    const newHeight = parseInt(originalHeight * scale, 10);
    const newWidth = parseInt(originalWidth * scale, 10);

    resImageURL = `${url
      .replace(originalHeight, newHeight)
      .replace(originalWidth, newWidth)
      .replace(originalQuality, boxQuality)}&imageType=${imageType}`;
  } catch {
    return url;
  }

  return resImageURL;
};

document.addEventListener('touchmove', listenerScroll, { passive: false });

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

window.global = Object.assign(global, {
  Lang,
  Country,
  CableOperator,
  isEmpty,
  isUndefined,
  isDate,
  removeUrlSpecialCharacters,
  getUrlImageStatic,
  getPathURL,
  calculateSizeImage,
  uuid
});
