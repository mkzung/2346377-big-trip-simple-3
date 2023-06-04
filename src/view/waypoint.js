import {getDateDayAndMo, getDateWithoutT, getDateWithT, getTime} from '../utils';
import AbstractView from '../framework/view/abstract-view';
import { getItemFromItemsById } from '../utils';
import he from 'he';


function createOffersTemplate(selectedOffersIDs, offers, type) {
  const currentTypeOffers = offers.find((el) => el.type === type).offers;
  return currentTypeOffers.filter((offer) => selectedOffersIDs.includes(offer.id))
    .map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`)
    .join('');
}

function createWaypointTemplate(oneWaypoint, destinations, offers) {
  const itemDest = getItemFromItemsById(destinations, oneWaypoint.destination);
  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDateWithoutT(oneWaypoint.dateFrom)}">${getDateDayAndMo(oneWaypoint.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${oneWaypoint.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${oneWaypoint.type} ${he.encode(itemDest.name)}</h3>
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
      ${createOffersTemplate(oneWaypoint.offersIDs, offers, oneWaypoint.type)}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class WaypointView extends AbstractView {
  #oneWaypoint = null;
  #handleClick = null;
  #offers = null;
  #destinations = null;

  constructor({oneWaypoint, onClick, offers, destinations}) {
    super();
    this.#oneWaypoint = oneWaypoint;
    this.#handleClick = onClick;
    this.#offers = offers;
    this.#destinations = destinations;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createWaypointTemplate(this.#oneWaypoint, this.#destinations, this.#offers);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
