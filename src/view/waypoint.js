import {createElement} from '../render.js';
import {getDestinationByID} from '../mock/destination';
import {getDateDayAndMo, getDateWithoutT, getDateWithT, getTime} from '../utils';
import {getOfferById} from '../mock/offers';

function createOffersTemplate(offerIds, type) {
  return offerIds.map((offerId) => {
    const oneOffer = getOfferById(type, offerId);
    return `<li class="event__offer">
          <span class="event__offer-title">${oneOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${oneOffer.price}</span>
        </li>`;
  }).join('');
}

function createWaypointTemplate(oneWaypoint) {
  const itemDest = getDestinationByID(oneWaypoint.destination);
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateWithoutT(oneWaypoint.dateFrom)}">${getDateDayAndMo(oneWaypoint.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${oneWaypoint.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${oneWaypoint.type} ${itemDest.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateWithT(oneWaypoint.dateFrom)}">${getTime(oneWaypoint.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateWithT(oneWaypoint.dateTo)}">${getTime(oneWaypoint.dateTo)}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${oneWaypoint.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createOffersTemplate(oneWaypoint.offersIDs, oneWaypoint.type)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class WaypointView {
  #element = null;
  #oneWaypoint = null;

  constructor(oneWaypoint) {
    this.#oneWaypoint = oneWaypoint;
  }

  get template() {
    return createWaypointTemplate(this.#oneWaypoint);
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
