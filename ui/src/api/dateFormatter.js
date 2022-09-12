import { DateTime } from 'luxon';

export default {
  /**
   * Get a string with a format like "in 60 days"
   * @param dateStr {string} Like 'MM/dd/yy'
   * @returns {string}
   */
  daysLeft(dateStr) {
    try {
      const dt = DateTime.fromFormat(dateStr, 'MM/dd/yy');
      return dt.toRelative({ unit: ['days', 'hours'] });
    } catch (e) {
      console.warn(e);
    }
    return dateStr;
  },

  /**
   * Get a string with a format like "in 60 days"
   * @param dateStr {string} Like '2022-11-09T00:00:00.000Z'
   * @returns {string}
   */
  daysLeftIso(dateStr) {
    try {
      const dt = DateTime.fromISO(dateStr);
      return dt.toRelative({ unit: ['days', 'hours'] });
    } catch (e) {
      console.warn(e);
    }
    return dateStr;
  },

  /**
   * Get a string with a format like " Oct 28, 2022"
   * @param dateStr {string} Like 'MM/dd/yy'
   * @param iso {boolean}
   * @returns {string}
   */
  niceDate(dateStr) {
    try {
      const dt = DateTime.fromFormat(dateStr, 'MM/dd/yy');
      return dt.toLocaleString(DateTime.DATE_MED);
    } catch (e) {
      console.warn(e);
    }
    return dateStr;
  },

  /**
   * Get a string with a format like " Oct 28, 2022"
   * @param dateStr {string} Like '2022-11-09T00:00:00.000Z'
   * @param iso {boolean}
   * @returns {string}
   */
  niceIsoDate(dateStr) {
    try {
      const dt = DateTime.fromISO(dateStr);
      return dt.toLocaleString(DateTime.DATE_MED);
    } catch (e) {
      console.warn(e);
    }
    return dateStr;
  },
};
