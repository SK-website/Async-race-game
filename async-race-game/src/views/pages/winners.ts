import { BaseComponent } from '../components/base-component';
import { PagesControl } from '../components/pages-control/pages-control';
import { Winners } from '../components/winners-table/winners-table';

export class WinnersPage extends BaseComponent {
  private readonly winners: Winners;

  private readonly winnersTitle: BaseComponent;

  private readonly pageNumber: BaseComponent;

  private readonly pagesControl: PagesControl;

  constructor() {
    super();
    this.winners = new Winners();
    const paginationContainer = new BaseComponent('div', ['pagination']);
    this.winnersTitle = new BaseComponent('p', ['page-title']);
    this.winnersTitle.element.innerHTML = `
    Winners ()`;
    this.pageNumber = new BaseComponent('p', ['page-namber']);
    this.pageNumber.element.innerHTML = `
    Page #`;
    paginationContainer.element.appendChild(this.winnersTitle.element);
    paginationContainer.element.appendChild(this.pageNumber.element);

    this.pagesControl = new PagesControl();

    this.element.appendChild(paginationContainer.element);
    this.element.appendChild(this.winners.element);
    this.element.appendChild(this.pagesControl.element);
  }
}
