import {getRandomPoint} from '../mock/point';

const POINT_COUNT = 5;

export default class ModelWaypoint {
  #arrWaypoints = Array.from({length: POINT_COUNT}, getRandomPoint);

  get arrWaypoints() {
    return this.#arrWaypoints;
  }
}
