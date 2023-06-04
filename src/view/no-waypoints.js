import AbstractView from '../framework/view/abstract-view';

function createNoWaypoitsMessageTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoWaypointMessage extends AbstractView {
  get template() {
    return createNoWaypoitsMessageTemplate();
  }
}
