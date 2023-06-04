export default class ModelOffers {
  #offers = null;

  constructor(offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}
