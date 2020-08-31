const addUrlParam = param => {
  let url = global.location.href;
  url += (url.split('?')[1] ? '&' : '?') + param;
  return url;
};

const removeUrlParam = (key, sourceURL) => {
  let rtn = sourceURL.split('?')[0];
  let param;
  let paramsArr = [];
  const queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    paramsArr = queryString.split('&');
    for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
      param = paramsArr[i].split('=')[0];
      if (param === key) {
        paramsArr.splice(i, 1);
      }
    }
    rtn = `${rtn}?${paramsArr.join('&')}`;
  }
  return rtn;
};

const replaceUrlParam = (url, paramName, paramValue) => {
  if (paramValue == null) {
    paramValue = '';
  }
  const pattern = new RegExp(`\\b(${paramName}=).*?(&|#|$)`);
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, `$1${paramValue}$2`);
  }
  url = url.replace(/[?#]$/, '');
  return `${url + (url.indexOf('?') > 0 ? '&' : '?') + paramName}=${paramValue}`;
};

const url = {
  addUrlParam,
  removeUrlParam,
  replaceUrlParam
};

module.exports = url;
