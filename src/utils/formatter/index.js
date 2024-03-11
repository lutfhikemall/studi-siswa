import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import {id} from 'date-fns/locale';

export const dateToRelative = (date) => {
  try {
    if (isToday(date)) {
      return 'hari ini';
    } else if (isYesterday(date)) {
      return 'kemarin';
    } else {
      return formatDistanceToNow(new Date(date), {
        includeSeconds: true,
        addSuffix: true,
        locale: id,
      });
    }
  } catch (e) {
    return '';
  }
};

export const dateToTime = (date) => {
  try {
    return format(date, 'HH:mm', {locale: id});
  } catch (e) {
    return '';
  }
};

export const chatDate = (date) => {
  try {
    return format(date, 'EEEE, dd MMMM Y', {locale: id});
  } catch (e) {
    return '';
  }
};

export const ujianDate = (date1, date2) => {
  try {
    const Date1 = format(date1, 'HH:mm', {locale: id});
    const Date2 = format(date2, 'HH:mm', {locale: id});

    return `${Date1} - ${Date2}`;
  } catch (e) {
    return '';
  }
};
