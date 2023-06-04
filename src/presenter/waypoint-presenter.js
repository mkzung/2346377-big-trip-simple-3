import {render, replace, remove} from '../framework/render';
import WaypointView from '../view/waypoint';
import EditForm from '../view/edit-form';
import {isDatesEqual, isEsc} from '../utils';
import {UpdateType, UserAction} from '../mock/const';

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
  #offers = [];
  #destinations = [];
  #handleDataChange = null;

  constructor({waypointList, onModeChange, offers, destinations, onDataChange}) {
    this.#waypointList = waypointList;
    this.#handleModeChange = onModeChange;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
  }

  init(waypoint, destinations, offers) {
    this.#waypoint = waypoint;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    this.#waypointComponent = new WaypointView({
      oneWaypoint: this.#waypoint,
      onClick: this.#handleEditClick,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#editFormComponent = new EditForm({
      oneWaypoint: waypoint,
      onSubmit: this.#handleFormSubmit,
      offers: this.#offers,
      destinations: this.#destinations,
      onRollUpButton: this.#handleButtonClick,
      onDeleteClick: this.#handleDeleteClick
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
      this.#editFormComponent.reset(this.#waypoint);
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
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#ecsKeydown);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.body.addEventListener('keydown', this.#ecsKeydown);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = !isDatesEqual(this.#waypoint.dateFrom, update.dateFrom) || this.#waypoint.basePrice !== update.basePrice;
    this.#handleDataChange(
      UserAction.UPDATE_WAYPOINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };

  #handleButtonClick = () => {
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceFormToPoint();
    document.body.removeEventListener('keydown', this.#ecsKeydown);
  };

  #handleDeleteClick = (waypoint) => {
    this.#handleDataChange(
      UserAction.DELETE_WAYPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };

}
