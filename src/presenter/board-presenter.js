import Sorting from '../view/sorting';
import WaypointList from '../view/waypoint-list';
import NoWaypointMessage from '../view/no-waypoints';
import {remove, render, RenderPosition} from '../framework/render';
import WaypointPresenter from './waypoint-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sorts} from '../sort';
import {filter} from '../utils';
import NewWaypointPresenter from './new-waypoint-presenter';
import LoadingView from '../view/loading';

export default class BoardPresenter {
  #waypointListComponent = new WaypointList();
  #waypointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  #boardContainer = null;
  #waypointsModel = null;
  #modelOffers = null;
  #modelDestinations = null;
  #modelFilter = null;
  #noWaypointMessage = null;
  #sortComponent = null;
  #newWaypointPresenter = null;

  constructor({boardContainer, waypointsModel, modelOffers, modelDestinations, modelFilter, onNewWaypointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#waypointsModel = waypointsModel;
    this.#modelOffers = modelOffers;
    this.#modelDestinations = modelDestinations;
    this.#modelFilter = modelFilter;

    this.#newWaypointPresenter = new NewWaypointPresenter({
      waypointListContainer: this.#waypointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewWaypointDestroy
    });

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#modelFilter.addObserver(this.#handleModelEvent);
  }

  get waypoints() {
    this.#filterType = this.#modelFilter.filter;
    const waypoints = this.#waypointsModel.waypoints.sort(sorts[SortType.TIME]);
    const filteredWaypoints = filter[this.#filterType](waypoints);
    return (sorts[this.#currentSortType]) ? filteredWaypoints.sort(sorts[this.#currentSortType]) : filteredWaypoints;
  }

  get destinations() {
    return this.#modelDestinations.destinations;
  }

  get offers() {
    return this.#modelOffers.offers;
  }

  init() {
    this.#renderBoard();
  }

  createWaypoint() {
    this.#currentSortType = SortType.DAY;
    this.#modelFilter.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.init(this.destinations, this.offers);
  }

  #renderSort() {
    this.#sortComponent = new Sorting({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoWaypoint() {
    this.#noWaypointMessage = new NoWaypointMessage({
      filterType: this.#filterType
    });
    render(this.#noWaypointMessage, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      waypointList: this.#waypointListComponent.element,
      offers: this.offers,
      destinations: this.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint, this.destinations, this.offers);
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  }

  #renderWaypointsList(waypoints) {
    waypoints.forEach((waypoint) => this.#renderWaypoint(waypoint));
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const waypoints = this.waypoints;
    if (waypoints.length === 0) {
      this.#renderNoWaypoint();
      return;
    }
    this.#renderSort();
    render(this.#waypointListComponent, this.#boardContainer);
    this.#renderWaypointsList(waypoints);
  }


  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointsModel.updateWaypoint(updateType, update);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#waypointsModel.addWaypoint(updateType, update);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#waypointsModel.deleteWaypoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #clearBoard(resetSortType = false) {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach((presenter) => presenter.destroy());
    this.#waypointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noWaypointMessage) {
      remove(this.#noWaypointMessage);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
