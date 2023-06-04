import {createElement} from '../render.js';

function createSortingTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
  );
}

export default class Sorting {
  getTemplate() {
    return createSortingTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
