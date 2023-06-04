export default class ModelDestinations {
  #destinations = null;

  constructor(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}
