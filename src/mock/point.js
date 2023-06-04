import {getRandomItemFromItems, getRandomPrice, createIDgenerator} from '../utils.js';
import {variousDates, pointTypes } from './const.js';
import { destinations, generateDestinations } from './destination.js';
import {getRandomOffersIdsByType} from './offers.js';

const waypoints = [];

const generateWaypointId = createIDgenerator();
const generateWaypoints = (n) => {
  for (let i = 0; i < n; i++) {
    const dates = getRandomItemFromItems(variousDates);
    const type = getRandomItemFromItems(pointTypes);
    const waypoint = {
      basePrice: getRandomPrice(),
      dateFrom: dates.dateFrom,
      dateTo: dates.dateTo,
      destination: getRandomItemFromItems(destinations).id,
      id: generateWaypointId(),
      offersIDs: getRandomOffersIdsByType(type),
      type
    };
    waypoints.push(waypoint);
  }
};

const mockInit = (numWaypoints, numDestinations) => {
  generateDestinations(numDestinations);
  generateWaypoints(numWaypoints);
};

export {mockInit, waypoints};
