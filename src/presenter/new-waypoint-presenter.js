import {render, RenderPosition} from '../render';
import {UpdateType, UserAction} from '../const';

import EditForm from '../view/edit-form';
import {remove} from '../framework/render';
import {isEsc} from '../utils';
import {nanoid} from 'nanoid';

export default class NewWaypointPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #waypointListContainer = null;
  #waypointEditComponent = null;

  constructor({waypointListContainer, onDataChange, onDestroy}) {
    this.#waypointListContainer = waypointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, offers) {
    if (this.#waypointEditComponent !== null) {
      return;
    }

    this.#waypointEditComponent = new EditForm({
      destinations: destinations,
      offers: offers,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isEditForm: false
    });

    render(this.#waypointEditComponent, this.#waypointListContainer,
      RenderPosition.AFTERBEGIN);

    document.body.addEventListener('keydown', this.#ecsKeyDownHandler);
  }

  destroy() {
    if (this.#waypointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#waypointEditComponent);
    this.#waypointEditComponent = null;

    document.body.removeEventListener('keydown', this.#ecsKeyDownHandler);
  }


  #ecsKeyDownHandler = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (waypoint) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,

      {id: nanoid(), ...waypoint}
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
