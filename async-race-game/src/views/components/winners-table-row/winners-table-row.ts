import './winners-table-row.scss';
import '../winners-table/winners-table.scss';

import { BaseComponent } from '../base-component';

type WinData = {
  number: string;
  car: HTMLElement;
  name: string;
  wins: string;
  time: string;
};

export class WinnerTableRow extends BaseComponent {
  // public winnersTableRow: BaseComponent;

  constructor(carData: WinData) {
    super('div', ['winners-row']);

    this.element.innerHTML = `
    <div class="winners-row">
    <div class="winners-col">${carData.number}</div>
    <div class="winners-col">${carData.car}</div>
    <div class="winners-col">${carData.name}</div>
    <div class="winners-col">${carData.wins}</div>
    <div class="winners-col">${carData.time}</div></div>
  </div>
    `;
  }
}
