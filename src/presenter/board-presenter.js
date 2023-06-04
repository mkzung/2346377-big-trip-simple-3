import CreationForm from '../view/creation-form';
import EditForm from '../view/edit-form';
import Sorting from '../view/sorting';
import WaypointView from '../view/waypoint';
import WaypointList from '../view/waypoint-list';
import {render} from '../render';
import {isEsc} from '../utils';

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
    render(new Sorting(), this.#boardContainer);
    this.#waypointListComponent = new WaypointList();
    render(this.#waypointListComponent, this.#boardContainer);
    render(new CreationForm(), this.#waypointListComponent.element);
    this.#renderWaypoint(waypoints[0]);
    for (let i = 1; i < 4; i++) {
      this.#renderWaypoint(waypoints[i]);
    }
  }

  #renderWaypoint(waypoint) {
    const waypointComponent = new WaypointView(waypoint);
    const formComponent = new EditForm(waypoint);

    const replaceFormToWaypoint = () => {
      this.#waypointListComponent.element.replaceChild(waypointComponent.element, formComponent.element);
    };

    const replaceWaypointToForm = () => {
      this.#waypointListComponent.element.replaceChild(formComponent.element, waypointComponent.element);
    };

    waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceWaypointToForm();
      document.body.addEventListener('keydown', closeOnEsc);
    });

    formComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.body.removeEventListener('keydown', closeOnEsc);
    });

    function closeOnEsc(evt) {
      if (isEsc(evt)) {
        evt.preventDefault();
        replaceFormToWaypoint();
        document.body.removeEventListener('keydown', closeOnEsc);
      }
    }

    formComponent.element.querySelector('.event').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.body.removeEventListener('keydown', closeOnEsc);
    });

    render(waypointComponent, this.#waypointListComponent.element);
  }
}
