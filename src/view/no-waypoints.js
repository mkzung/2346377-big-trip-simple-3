import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../mock/const';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createNoWaypoitsMessageTemplate(filterType) {
  return `<p class="trip-events__msg">${NoTasksTextType[filterType]}</p>`;
}

export default class NoWaypointMessage extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoWaypoitsMessageTemplate(this.#filterType);
  }
}
