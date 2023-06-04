import CreationForm from '../view/creation-form';
import EditForm from '../view/edit-form';
import Sorting from '../view/sorting';
import WaypointView from '../view/waypoint';
import WaypointList from '../view/waypoint-list';
import {render} from '../render';

export default class BoardPresenter {
  waypointListComponent = new WaypointList();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new Sorting(), this.boardContainer);
    render(this.waypointListComponent, this.boardContainer);
    render(new CreationForm(), this.waypointListComponent.getElement());
    render(new WaypointView(), this.waypointListComponent.getElement());
    render(new EditForm(), this.waypointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.waypointListComponent.getElement());
    }
  }
}
