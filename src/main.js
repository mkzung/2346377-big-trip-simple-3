import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter';
import ModelWaypoint from './model/model-waypoint';
import {mockInit, waypoints} from './mock/point';
import {render} from './framework/render';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(3, 10);
const modelWaypoints = new ModelWaypoint(waypoints);
const boardPresenter = new BoardPresenter({boardContainer: container, waypointsModel: modelWaypoints});
render(new Filters(), siteHeaderElement);
boardPresenter.init();
