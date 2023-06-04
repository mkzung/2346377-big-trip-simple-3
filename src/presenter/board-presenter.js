import CreationForm from '../view/creation-form';
import Sorting from '../view/sorting';
import WaypointList from '../view/waypoint-list';
import NoWaypointMessage from '../view/no-waypoints';
import {render, RenderPosition} from '../framework/render';
import WaypointPresenter from './waypoint-presenter';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #noWaypointMessage = new NoWaypointMessage();
  #sortComponent = new Sorting();
  #waypointPresenter = new Map();

  #boardContainer = null;
  #waypointsModel = null;
  #waypoints = null;


  constructor({boardContainer, waypointsModel}) {
    this.#boardContainer = boardContainer;
    this.#waypointsModel = waypointsModel;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.arrWaypoints];
    this.#renderBoard();
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoWaypoint() {
    render(this.#noWaypointMessage, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };


  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      onModeChange: this.#handleModeChange
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  }


  #renderWaypoints() {
    this.#waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  #renderWaypointsList() {
    render(this.#waypointListComponent, this.#boardContainer);
    this.#renderWaypoints();
  }

  #renderBoard() {
    if (this.#waypoints.length === 0) {
      render(this.#renderNoWaypoint, this.#boardContainer);
      return;
    }
    this.#renderSort();

    render(new CreationForm(this.#waypoints[0]), this.#waypointListComponent.element);
    this.#renderWaypointsList();
  }
}
