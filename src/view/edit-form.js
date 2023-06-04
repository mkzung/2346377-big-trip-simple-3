import {getDateYears, getItemFromItemsById} from '../utils';
import {pointTypes} from '../mock/const';
import {makeFirstLetterUpperCase} from '../utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const BLANK_WAYPOINT = {
  basePrice: 77777,
  dateFrom: '2077-07-17T17:17:17.375Z',
  dateTo: '2088-07-17T17:17:17.375Z',
  destination: undefined,
  id: 0,
  offersIDs: [],
  type: 'taxi',
};

function createDetinationListTemplate(destinations) {
  return destinations.map((destination) => `
    <option value="${destination.name}"></option>`
  ).join('');
}

function createOffersTemplate(offersIDs, curTypeOffers, id) {
  return curTypeOffers.map((offer) => {
    const isOfferChecked = offersIDs.includes(offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-${id}" type="checkbox" name="event-offer-${offer.id}" ${isOfferChecked}>
      <label class="event__offer-label" for="event-offer-${offer.id}-${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
}

function createImgForDestion(destination) {
  if (!destination) {
    return '';
  }
  return destination.pictures.map((img) => `<img class="event__photo" src="${img.src}" alt="${img.description}">`).join('');
}

function createEventTypeListTemplate(currentType, id) {
  return pointTypes.map((type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === currentType) ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${makeFirstLetterUpperCase(type)}</label>
  </div>`
  ).join('');
}

function createEditFormTemplate(isEditForm, oneWaypoint, offers, destinations) {
  const itemDest = getItemFromItemsById(destinations, oneWaypoint.destination);
  const curTypeOffers = offers.find((element) => element.type === oneWaypoint.type).offers;
  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${oneWaypoint.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${oneWaypoint.type}.png" alt="${oneWaypoint.type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${oneWaypoint.id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${createEventTypeListTemplate(oneWaypoint.type, oneWaypoint.id)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${oneWaypoint.id}">
          ${makeFirstLetterUpperCase(oneWaypoint.type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${oneWaypoint.id}" type="text" name="event-destination" value="${(itemDest) ? itemDest.name : ''}" list="destination-list-${oneWaypoint.id}" autocomplete="off">
        <datalist id="destination-list-${oneWaypoint.id}">
          ${createDetinationListTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${oneWaypoint.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${oneWaypoint.id}" type="text" name="event-start-time" value="${getDateYears(oneWaypoint.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${oneWaypoint.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${oneWaypoint.id}" type="text" name="event-end-time" value="${getDateYears(oneWaypoint.dateFrom)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${oneWaypoint.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${oneWaypoint.id}" type="number" name="event-price" value="${oneWaypoint.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${(isEditForm) ? 'Delete' : 'Cancel'}</button>
       ${(isEditForm) ? `
       <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
       </button>` :
      ''}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers  ${(curTypeOffers.length === 0) ? 'visually-hidden' : ''}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
            ${createOffersTemplate(oneWaypoint.offersIDs, curTypeOffers, oneWaypoint.id)}
        </div>
      </section>

      <section class="event__section  event__section--destination  ${(!itemDest) ? 'visually-hidden' : ''}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${(itemDest) ? itemDest.description : ''}</p>
         <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createImgForDestion(itemDest)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`
  );
}

export default class EditForm extends AbstractStatefulView {
  #handleRollUp = null;
  #handleSubmit = null;
  #isEditForm = null;
  #fromDatepicker = null;
  #toDatepicker = null;
  #handleDeleteClick = null;
  #destinations = [];
  #offers = [];

  static parseWaypointToState(waypoint, offers) {
    return {
      ...waypoint,
      curTypeOffers: offers.find((el) => el.type === waypoint.type).offers
    };
  }

  static parseStateToWaypoint(state) {
    const waypoint = {...state};
    delete waypoint.curTypeOffers;
    return waypoint;
  }

  constructor({
    oneWaypoint = BLANK_WAYPOINT,
    offers,
    destinations,
    isEditForm = true,
    onSubmit = () => (0),
    onRollUpButton,
    onDeleteClick
  }) {
    super();
    this._setState(EditForm.parseWaypointToState(oneWaypoint, offers));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#isEditForm = isEditForm;
    this.#handleSubmit = onSubmit;
    this.#handleRollUp = onRollUpButton;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();

  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    if (this.#isEditForm) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpButtonHandler);
    }
    this.#setFromDatePicker();
    this.#setToDatePicker();

  }

  removeElement() {
    super.removeElement();

    if (this.#fromDatepicker) {
      this.#fromDatepicker.destroy();
      this.#fromDatepicker = null;
    }

    if (this.#toDatepicker) {
      this.#toDatepicker.destroy();
      this.#toDatepicker = null;
    }
  }

  reset(waypoint) {
    this.updateElement(
      EditForm.parseWaypointToState(waypoint, this.#offers),
    );
  }

  get template() {
    return createEditFormTemplate(this.#isEditForm, this._state, this.#offers, this.#destinations);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditForm.parseStateToWaypoint(this._state));
  };

  #rollUpButtonHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUp();
  };


  #fromDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate.toISOString(),
    });
    this.#toDatepicker.set('minDate', userDate);
  };


  #toDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toISOString(),
    });
  };

  #setFromDatePicker() {
    this.#fromDatepicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: getDateYears(this._state.dateFrom),
        onChange: this.#fromDateChangeHandler,
      },
    );
  }

  #setToDatePicker() {
    this.#toDatepicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this._state.id}`),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: getDateYears(this._state.dateTo),
        minDate: getDateYears(this._state.dateFrom),
        onChange: this.#toDateChangeHandler,
      },
    );
  }

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersIDs: [],
      curTypeOffers: this.#offers.find((el) => el.type === evt.target.value).offers
    });
  };

  #destinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#destinations.find((destination) => destination.name === evt.target.value).id,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #offersHandler = (evt) => {
    evt.preventDefault();
    const clickedOfferId = Number(evt.target.name.split('-').at(-1));
    const newOffersIds = this._state.offersIDs.slice();
    if (newOffersIds.includes(clickedOfferId)) {
      newOffersIds.splice(newOffersIds.indexOf(clickedOfferId), 1);
    } else {
      newOffersIds.push(clickedOfferId);
    }
    this._setState({
      offersIDs: newOffersIds
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditForm.parseStateToWaypoint(this._state));
  };
}
