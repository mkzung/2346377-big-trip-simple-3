import dayjs from 'dayjs';
import {FilterType} from './mock/const';

const EVENT_DATE_FORMAT = 'MMM D';
const EVENT_TIME_FORMAT = 'H:mm';
const EVENT_YEARS_FORMAT = 'DD/MM/YY HH:mm';

const getRandomItemFromItems = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 100000) + 777;

const getRandomSliceFromItems = (items) => {
  const n = Math.floor(Math.random() * (items.length + 1));
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const createIDgenerator = () => {
  let id = 0;
  return () => ++id;
};

const isEsc = (evt) => evt.key === 'Escape';

const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));

const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

const getDateWithoutT = (dateStr) => dateStr.substring(0, dateStr.indexOf('T'));
const getDateDayAndMo = (dateStr) => dayjs(dateStr).format(EVENT_DATE_FORMAT);
const getDateWithT = (dateStr) => dateStr.substring(0, dateStr.lastIndexOf(':'));
const getTime = (dateStr) => dayjs(dateStr).format(EVENT_TIME_FORMAT);
const getDateYears = (date) => dayjs(date).format(EVENT_YEARS_FORMAT);

const isDatesEqual = (date1, date2) => (!date1 && !date2) || dayjs(date1).isSame(date2, 'D');

const makeFirstLetterUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const isFuture = (date) => date && dayjs().isBefore(date, 'D');
const isPast = (date) => date && dayjs().isAfter(date, 'D');

const filter = {
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isFuture(waypoint.dateFrom)),
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => isPast(waypoint.dateFrom)),
};

export {
  getRandomItemFromItems,
  getRandomPrice,
  getRandomSliceFromItems,
  createIDgenerator,
  getDateWithoutT,
  getDateDayAndMo,
  getDateWithT,
  getTime,
  getItemFromItemsById,
  getDateYears,
  isEsc,
  isTripDateBeforeToday,
  makeFirstLetterUpperCase,
  isDatesEqual,
  filter
};
