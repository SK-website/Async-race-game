import './winners-table.scss';

import { BaseComponent } from '../base-component';

export class Winners extends BaseComponent {
  // private winnersTableHeader: BaseComponent;

  public winnerNumber: BaseComponent;

  public winnerCar: BaseComponent;

  public winnerName: BaseComponent;

  public winnerWins: BaseComponent;

  public winnerTime: BaseComponent;

  private readonly winnersTableHeader: BaseComponent;

  public onButtonClick: (() => void) | null = null;

  constructor() {
    super('div', ['winners-header-container']);
    this.winnersTableHeader = new BaseComponent('div', ['winners-row']);
    this.winnerNumber = new BaseComponent('div', ['title-winners-col']);
    this.winnerNumber.element.textContent = 'number';
    this.winnerCar = new BaseComponent('div', ['title-winners-col']);
    this.winnerCar.element.textContent = 'car';
    this.winnerName = new BaseComponent('div', ['title-winners-col']);
    this.winnerName.element.textContent = 'name';
    this.winnerWins = new BaseComponent('div', ['title-winners-col']);
    this.winnerWins.element.textContent = 'wins';
    this.winnerTime = new BaseComponent('div', ['title-winners-col']);
    this.winnerTime.element.textContent = 'time';

    this.winnerWins.element.addEventListener('click', () => {
      this.onButtonClick?.();
    });
    this.winnerTime.element.addEventListener('click', () => {
      this.onButtonClick?.();
    });
    this.winnersTableHeader.element.appendChild(this.winnerNumber.element);
    this.winnersTableHeader.element.appendChild(this.winnerCar.element);
    this.winnersTableHeader.element.appendChild(this.winnerName.element);
    this.winnersTableHeader.element.appendChild(this.winnerWins.element);
    this.winnersTableHeader.element.appendChild(this.winnerTime.element);
    this.element.appendChild(this.winnersTableHeader.element);
  }
}
