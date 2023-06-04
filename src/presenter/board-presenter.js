import CreationForm from '../view/creation-form';
import EditForm from '../view/edit-form';
import Sorting from '../view/sorting';
import WaypointView from '../view/waypoint';
import WaypointList from '../view/waypoint-list';
import {render} from '../render';

export default class BoardPresenter {
  waypointListComponent = new WaypointList();

  constructor({boardContainer, waypointsModel}) {
    this.boardContainer = boardContainer;
    this.waypointsModel = waypointsModel;
  }

  init() {
    const waypoints = [...this.waypointsModel.getWaypoints()];
    render(new Sorting(), this.boardContainer);
    render(this.waypointListComponent, this.boardContainer);
    render(new CreationForm(), this.waypointListComponent.getElement());
    render(new WaypointView({oneWaypoint: waypoints[0]}), this.waypointListComponent.getElement());
    render(new EditForm({oneWaypoint: waypoints[0]}), this.waypointListComponent.getElement());

    for (let i = 1; i < 4; i++) {
      render(new WaypointView({oneWaypoint: waypoints[i]}), this.waypointListComponent.getElement());
    }
  }
}
