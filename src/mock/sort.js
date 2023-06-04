import { SortType } from './const';

const sorts = {
  [SortType.DAY]: () => (0),
  [SortType.EVENT]: () => (0),
  [SortType.OFFERS]: () => (0),
  [SortType.PRICE]: () => (0),
  [SortType.TIME]: () => (0),
};

function generateSorter() {
  return Object.keys(sorts).map((sortName) => sortName);
}

export {generateSorter};
