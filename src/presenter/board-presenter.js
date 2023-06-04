import CreationForm from '../view/creation-form';
import EditForm from '../view/edit-form';
import Sorting from '../view/sorting';
import WaypointView from '../view/waypoint';
import WaypointList from '../view/waypoint-list';
import {isEsc} from '../utils';
import NoWaypointMessage from '../view/no-waypoints';
import {render, replace} from '../framework/render';

export default class BoardPresenter {
  #waypointListComponent = null;
  #boardContainer = null;
  #waypointsModel = null;
  #noWaypointMessage = null;

  constructor({boardContainer, waypointsModel}) {
    this.#boardContainer = boardContainer;
    this.#waypointsModel = waypointsModel;
  }

  init() {
    const waypoints = [...this.#waypointsModel.arrWaypoints];
    if (waypoints.length === 0) {
      this.#noWaypointMessage = new NoWaypointMessage();
      render(this.#noWaypointMessage, this.#boardContainer);
    } else {
      this.#waypointListComponent = new WaypointList();
      render(new Sorting(), this.#boardContainer);
      render(this.#waypointListComponent, this.#boardContainer);
      render(new CreationForm(waypoints[0]), this.#waypointListComponent.element);

      for (let i = 1; i < 4; i++) {
        this.#renderWaypoint(waypoints[i]);
      }
    }
  }

  #renderWaypoint(waypoint) {
    const ecsHandler = (evt) => {
      if (isEsc(evt)) {
        evt.preventDefault();
        replaceFormToWaypoint();
        document.body.removeEventListener('keydown', ecsHandler);
      }
    };
    const waypointComponent = new WaypointView({
      oneWaypoint: waypoint,
      onClick: () => {
        replaceWaypointToForm.call(this);
        document.body.addEventListener('keydown', ecsHandler);
      }
    });

    const formComponent = new EditForm({
      oneWaypoint: waypoint,
      onSubmit: () => {
        replaceFormToWaypoint.call(this);
        document.body.removeEventListener('keydown', ecsHandler);
      }
    });

    function replaceFormToWaypoint() {
      replace(waypointComponent, formComponent);
    }

    function replaceWaypointToForm(){
      replace(formComponent, waypointComponent);
    }

    render(waypointComponent, this.#waypointListComponent.element);
  }
}
