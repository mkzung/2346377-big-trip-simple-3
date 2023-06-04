export default class ModelWaypoint {
  #waypoints = null;

  constructor(waypoints) {
    this.#waypoints = waypoints;
  }

  get waypoints() {
    return this.#waypoints;
  }
}
