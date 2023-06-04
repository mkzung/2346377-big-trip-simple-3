import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter';
import ModelWaypoint from './model/model-waypoint';
import {mockInit, waypoints} from './mock/point';
import {render} from './framework/render';
import ModelOffers from './model/offers-model';
import ModelDestinations from './model/destinations-model';
import {offersByType} from './mock/const';
import {destinations} from './mock/destination';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const modelOffers = new ModelOffers(offersByType);
const modelDestinations = new ModelDestinations(destinations);

const boardPresenter = new BoardPresenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations
});
render(new Filters(), siteHeaderElement);

boardPresenter.init();
