export default class ModelWaypoint {
  #arrWaypoints = null;

  constructor(arrWaypoints) {
    this.#arrWaypoints = arrWaypoints;
  }

  get arrWaypoints() {
    return this.#arrWaypoints;
  }
}
