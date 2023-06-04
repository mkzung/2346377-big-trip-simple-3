import BoardPresenter from './presenter/board-presenter';
import ModelWaypoint from './model/model-waypoint';
import {mockInit, waypoints} from './mock/point';
import ModelOffers from './model/model-offers';
import ModelDestinations from './model/model-destinations';
import {offersByType} from './mock/const';
import {destinations} from './mock/destination';
import ModelFilters from './model/model-filter';
import FilterPresenter from './presenter/filter-presenter';
import {render} from './render';
import NewWaypointButton from './view/new-waypoint-button';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');
const placeForButton = document.querySelector('.trip-main');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const modelOffers = new ModelOffers(offersByType);
const modelDestinations = new ModelDestinations(destinations);
const modelFilter = new ModelFilters();

const boardPresenter = new BoardPresenter({
  boardContainer: container,
  waypointsModel: modelWaypoints,
  modelOffers,
  modelDestinations,
  modelFilter,
  onNewWaypointDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  modelFilter,
  modelWaypoints
});

const newWaypointButtonComponent = new NewWaypointButton({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newWaypointButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  boardPresenter.createWaypoint();
  newWaypointButtonComponent.element.disabled = true;
}

render(newWaypointButtonComponent, placeForButton);

filterPresenter.init();
boardPresenter.init();
