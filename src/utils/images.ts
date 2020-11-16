/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
export const getUrlVars = (url: string): { [key: string]: string } => {
  let hash;
  const myJson: { [key: string]: string } = {};
  const hashes = url.slice(url.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
    // If you want to get in native datatypes
    // myJson[hash[0]] = JSON.parse(hash[1]);
  }
  return myJson;
};

export const getImage = (url = '', imageType = '', quality = 0, height = 0, width = 0) => {
  let resImageURL = url;

  if (url === '') {
    return 'no-image';
  }

  if (url === 'loading') {
    return 'loading';
  }

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
    const scaleHeight = parseFloat(String(boxHeight)) / parseFloat(String(originalHeight));
    const scaleWidth = parseFloat(String(boxWidth)) / parseFloat(String(originalWidth));
    const scale = Math.max(scaleHeight, scaleWidth);
    const newHeight = parseInt(String(originalHeight * scale), 10);
    const newWidth = parseInt(String(originalWidth * scale), 10);

    resImageURL = `${url
      .replace(`&Width=${String(originalWidth)}`, `&Width=${String(newWidth)}`)
      .replace(`&Height=${String(originalHeight)}`, `&Height=${String(newHeight)}`)
      .replace(`&Quality=${String(originalQuality)}`, `&Quality=${String(boxQuality)}`)}
      &imageType=${imageType}`;
  } catch {
    return url;
  }

  return resImageURL;
};
