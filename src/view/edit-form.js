import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const EVENT_TIME_FORMAT = 'H:mm';
const EVENT_YEARS_FORMAT = 'DD/MM/YY HH:mm';

const getRandomItemFromItems = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 100000) + 777;

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const getRandomSliceFromItems = (items) => {
  const n = Math.floor(Math.random() * (items.length + 1));
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const createIDgenerator = () => {
  let id = 0;
  return () => ++id;
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const isEsc = (evt) => evt.key === 'Escape';

const getItemFromItemsById = (items, id) => (items.find((item) => item.id === id));

const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

const changeType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

const getDateWithoutT = (dateStr) => dateStr.substring(0, dateStr.indexOf('T'));
const getDateDayAndMo = (dateStr) => dayjs(dateStr).format(EVENT_DATE_FORMAT);
const getDateWithT = (dateStr) => dateStr.substring(0, dateStr.lastIndexOf(':'));
const getTime = (dateStr) => dayjs(dateStr).format(EVENT_TIME_FORMAT);
const getDateYears = (date) => dayjs(date).format(EVENT_YEARS_FORMAT);

const updateWaypoint = (items, update) => items.map((item) => item.id === update.id ? update : item);

const makeFirstLetterUpperCase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export {
  getRandomItemFromItems,
  getRandomPrice,
  getRandomSliceFromItems,
  getRandomId,
  createIDgenerator,
  getRandomArrayElement,
  getDateWithoutT,
  getDateDayAndMo,
  getDateWithT,
  getTime,
  getItemFromItemsById,
  getDateYears,
  isEsc,
  changeType,
  isTripDateBeforeToday,
  updateWaypoint,
  makeFirstLetterUpperCase
};
