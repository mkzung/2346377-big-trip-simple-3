import {createElement} from '../render.js';

function createWaypointListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class WaypointList {
  #element = null;

  get template() {
    return createWaypointListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
