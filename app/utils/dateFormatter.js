import { DateTime } from "luxon";
const base = undefined;
// import { IANAZone } from 'luxon';
// const base = DateTime.fromObject(
//   { year: 2022, month: 12, day: 6, hour: 9 },
//   { zone: new IANAZone('America/New_York') }
// );

/**
 * Get a string with a format like "in 60 days"
 * @param dateStr {string} Like 'MM/dd/yy'
 * @returns {string}
 */
export const daysLeft = (dateStr) => {
  const { locale } = useI18n();
  try {
    const dt = DateTime.fromFormat(dateStr, "MM/dd/yy");
    return dt.toRelative({
      base,
      unit: ["days", "hours"],
      locale: locale.value || "en",
    });
  } catch (e) {
    console.warn(e);
  }
  return dateStr;
};

/**
 * Get a string with a format like "in 60 days"
 * @param dateStr {string} Like '2022-11-09T00:00:00.000Z'
 * @returns {string}
 */
export const daysLeftIso = (dateStr) => {
  const { locale } = useI18n();
  try {
    const dt = DateTime.fromISO(dateStr);
    return dt.toRelative({
      base,
      unit: ["days", "hours"],
      locale: locale.value || "en",
    });
  } catch (e) {
    console.warn(e);
  }
  return dateStr;
};

/**
 * Get a string with a format like " Oct 28, 2022"
 * @param dateStr {string} Like 'MM/dd/yy'
 * @returns {string}
 */
export const niceDate = (dateStr) => {
  const { locale } = useI18n();
  try {
    const dt = DateTime.fromFormat(dateStr, "MM/dd/yy");
    return dt.toLocaleString(DateTime.DATE_MED, {
      locale: locale.value || "en",
    });
  } catch (e) {
    console.warn(e);
  }
  return dateStr;
};

/**
 * Get a string with a format like " Oct 28, 2022"
 * @param dateStr {string} Like '2022-11-09T00:00:00.000Z'
 * @returns {string}
 */
export const niceIsoDate = (dateStr) => {
  const { locale } = useI18n();
  try {
    const dt = DateTime.fromISO(dateStr);
    return dt.toLocaleString(DateTime.DATE_MED, {
      locale: locale.value || "en",
    });
  } catch (e) {
    console.warn(e);
  }
  return dateStr;
};

/**
 * Is date in the past?
 * @param dateStr {string} Like 'MM/dd/yy'
 * @returns {boolean}
 */
export const tooLate = (dateStr) => {
  try {
    const dt = DateTime.fromFormat(dateStr, "MM/dd/yy");
    return DateTime.now().toMillis() > dt.toMillis();
  } catch (e) {
    return false;
  }
};

/**
 * Is date in the past?
 * @param dateStr {string} Like '2022-11-09T00:00:00.000Z'
 * @returns {boolean}
 */
export const tooLateIso = (dateStr) => {
  try {
    const dt = DateTime.fromISO(dateStr);
    const now = base || DateTime.now();
    return now.toMillis() > dt.toMillis();
  } catch (e) {
    return false;
  }
};
