import { BaseComponent } from '../components/base-component';
import { PagesControl } from '../components/pages-control/pages-control';
import { Winners } from '../components/winners-table/winners-table';
import { WinnerRowData, WinnerTableRow } from '../components/winners-table-row/winners-table-row';

export class WinnersPage extends BaseComponent {
  public winners: Winners;

  public winnersTotalAmount: BaseComponent;

  public pageNumber: BaseComponent;

  public pagesControl: PagesControl;

  public winnersContainer: BaseComponent;

  constructor() {
    super();
    this.winners = new Winners();
    const paginationContainer = new BaseComponent('div', ['pagination']);
    const winnersTitle = new BaseComponent('p', ['page-title']);
    winnersTitle.element.innerHTML = `
    Winners amount - `;
    this.winnersTotalAmount = new BaseComponent('span', ['page-title']);
    this.winnersTotalAmount.element.innerHTML = '';
    winnersTitle.element.appendChild(this.winnersTotalAmount.element);

    const page = new BaseComponent('p', ['page-namber']);
    page.element.innerHTML = `
    Page #`;
    this.pageNumber = new BaseComponent('span', ['page-namber']);
    this.pageNumber.element.innerHTML = '';
    page.element.appendChild(this.pageNumber.element);
    paginationContainer.element.appendChild(winnersTitle.element);
    paginationContainer.element.appendChild(page.element);
    this.winnersContainer = new BaseComponent('div', ['winners-container']);
    this.pagesControl = new PagesControl();

    this.element.appendChild(paginationContainer.element);
    this.element.appendChild(this.winners.element);
    this.element.appendChild(this.winnersContainer.element);
    this.element.appendChild(this.pagesControl.element);
  }

  addWinnersAmount(carsAmount: string): void {
    this.winnersTotalAmount.element.innerHTML = `${carsAmount}`;
  }

  addPageNumber(n: number): void {
    this.pageNumber.element.innerHTML = `${String(n)}`;
  }

  addWinnerRow(carData: WinnerRowData): void {
    const newWinnersTableRow = new WinnerTableRow(carData);
    this.winnersContainer.element.appendChild(newWinnersTableRow.element);
  }
}
