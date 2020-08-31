// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

module.exports = function(format, options) {
  let formatDate;

  if (format === 'minutes') {
    const dates = options.fn(this).split('--');
    const startTime = moment(dates[0]);
    const end = moment(dates[1]);
    formatDate = Math.round(moment.duration(end.diff(startTime)).asMinutes());
  } else {
    const date = parseInt(moment(options.fn(this)).format('X'), 10) * 1000;
    if (format === 'unix') {
      formatDate = date;
    } else {
      formatDate = moment(date).format(format);
    }
  }
  return formatDate;
};
