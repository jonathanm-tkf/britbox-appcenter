// custom dependencies
import Swiper from 'swiper/dist/js/swiper';
import Scrollbar from 'smooth-scrollbar/dist/smooth-scrollbar';
import Selectboxit from './selectboxit';
import Pinlogin from './pinlogin';

import Constants from './constants';
import Translate from './translate';
import Url from './url';

const deps = {
  Url,
  Selectboxit,
  Scrollbar,
  Swiper,
  Translate,
  Pinlogin,
  Constants: Constants[Constants.environment]
};

module.exports = deps;
