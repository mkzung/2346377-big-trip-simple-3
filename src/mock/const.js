const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const variousDates = [
  {
    dateFrom: '2023-01-17T18:12:13.375Z',
    dateTo: '2023-01-17T21:00:00.375Z'
  },
  {
    dateFrom: '2023-01-21T12:00:17.375Z',
    dateTo: '2023-01-21T15:30:17.375Z'
  },
  {
    dateFrom: '2023-01-25T06:30:15.375Z',
    dateTo: '2023-01-25T09:40:30.375Z'
  },
  {
    dateFrom: '2023-05-17T18:12:13.375Z',
    dateTo: '2023-05-17T21:00:00.375Z'
  },
  {
    dateFrom: '2023-05-21T12:00:17.375Z',
    dateTo: '2023-05-21T15:30:17.375Z'
  },
  {
    dateFrom: '2023-05-25T06:30:15.375Z',
    dateTo: '2023-05-25T09:40:30.375Z'
  },
  {
    dateFrom: '2023-07-17T18:12:13.375Z',
    dateTo: '2023-07-17T21:00:00.375Z'
  },
  {
    dateFrom: '2023-07-21T12:00:17.375Z',
    dateTo: '2023-07-21T15:30:17.375Z'
  },
  {
    dateFrom: '2023-07-25T06:30:15.375Z',
    dateTo: '2023-07-25T09:40:30.375Z'
  },
  {
    dateFrom: '2023-07-30T17:15:15.375Z',
    dateTo: '2023-07-30T18:15:18.375Z'
  }
];


const offersByType = [
  {
    type: 'taxi',
    offers: [{
      id: 1,
      title: 'Upgrade a business class',
      price: 120
    }, {
      id: 3,
      title: 'Switch to comfort',
      price: 50
    }]
  },
  {
    type: 'bus',
    offers: [{
      id: 7,
      title: 'Choose seats',
      price: 10
    }]
  },
  {
    type: 'train',
    offers: [{
      id: 1,
      title: 'Food order',
      price: 70
    }, {
      id: 5,
      title: 'Choose seats',
      price: 20
    }, {
      id: 7,
      title: 'Drinks order',
      price: 50
    }]
  },
  {
    type: 'ship',
    offers: [{
      id: 3,
      title: 'Bring a blanket',
      price: 12
    }, {
      id: 8,
      title: 'Change cabin',
      price: 76
    }, {
      id: 2,
      title: 'Add alcohol',
      price: 100
    }]
  },
  {
    type: 'drive',
    offers: [{
      id: 9,
      title: 'Upgrade a car',
      price: 150
    }]
  },
  {
    type: 'flight',
    offers: [{
      id: 1,
      title: 'Food order',
      price: 70
    }, {
      id: 7,
      title: 'Drinks order',
      price: 50
    }, {
      id: 5,
      title: 'Choose seats',
      price: 70
    }, {
      id: 6,
      title: 'Travel by ship',
      price: 100
    }]
  },
  {
    type: 'check-in',
    offers: [{
      id: 6,
      title: 'Online',
      price: 15
    }]
  },
  {
    type: 'sightseeing',
    offers: [{
      id: 6,
      title: 'Online',
      price: 15
    }]
  },
  {
    type: 'restaurant',
    offers: []
  },];

const descrText = [
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Aliquam erat volutpat.',
  'In rutrum ac purus sit amet tempus.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
];

const cities = [
  'Tokyo', 'Seoul', 'Shanghai', 'Paris', 'New York'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export {pointTypes, variousDates, offersByType, descrText, cities, FilterType, SortType};
