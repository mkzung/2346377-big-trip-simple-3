import { FilterType } from './const';
import { isTripDateBeforeToday } from '../utils';


const filter = {
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => isTripDateBeforeToday(waypoint.dateFrom)),
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
};


function generateFilter() {
  return Object.keys(filter).map((filterName) => filterName );
}


export {generateFilter};
