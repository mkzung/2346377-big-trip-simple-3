import {render, replace, remove} from '../framework/render';
import WaypointView from '../view/waypoint';
import EditForm from '../view/edit-form';
import {isEsc} from '../utils';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class WaypointPresenter {
  #handleModeChange = null;
  #waypointList = null;
  #editFormComponent = null;
  #waypointComponent = null;
  #waypoint = null;
  #mode = Mode.DEFAULT;

  constructor({waypointList, onModeChange}) {
    this.#waypointList = waypointList;
    this.#handleModeChange = onModeChange;
  }

  init(waypoint) {
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#waypointComponent = new WaypointView({
      oneWaypoint: this.#waypoint,
      onClick: this.#handleEditClick
    });

    this.#editFormComponent = new EditForm({
      oneWaypoint: waypoint,
      onSubmit: this.#handleFormSubmit
    });

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#waypointList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }

    remove(prevEditFormComponent);
    remove(prevWaypointComponent);
  }

  destroy() {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    this.#mode = Mode.DEFAULT;
  };

  #ecsKeydown = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeydown);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeydown);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };
}
