import Observable from '../framework/observable';

export default class ModelWaypoint extends Observable {
  #waypoints = null;

  constructor(waypoints) {
    super();
    this.#waypoints = waypoints;
  }

  get waypoints() {
    return this.#waypoints;
  }

  updateWaypoint(updateType, update) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting waypoint');
    }

    this.#waypoints = [
      ...this.waypoints.slice(0, index),
      update,
      ...this.#waypoints.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this.#waypoints = [
      update,
      ...this.#waypoints
    ];

    this._notify(updateType, update);
  }

  deleteWaypoint = (updateType, update) => {
    const index = this.#waypoints.findIndex((waypont) => waypont.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting waypoint');
    }

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      ...this.#waypoints.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
