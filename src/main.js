import Filters from './view/filters.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter';
import ModelWaypoint from './model/model-waypoint';
import {mockInit} from './mock/point';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(6, 10);
const modelWaypoints = new ModelWaypoint();
const boardPresenter = new BoardPresenter({boardContainer: container, waypointsModel: modelWaypoints});

render(new Filters(), siteHeaderElement);
boardPresenter.init();
