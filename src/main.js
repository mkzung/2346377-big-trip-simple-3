import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter';
import ModelWaypoint from './model/model-waypoint';
import {mockInit, waypoints} from './mock/point';
import {render} from './framework/render';
import {generateFilter} from './mock/filter';
import {generateSorter} from './mock/sort';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const container = document.querySelector('.trip-events');

mockInit(5, 10);
const filters = generateFilter();
const sorters = generateSorter();

const modelWaypoints = new ModelWaypoint(waypoints);
const boardPresenter = new BoardPresenter({boardContainer: container, waypointsModel: modelWaypoints, sorters});
render(new Filters(filters), siteHeaderElement);

boardPresenter.init();
