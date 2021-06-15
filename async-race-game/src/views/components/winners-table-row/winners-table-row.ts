import './winners-table-row.scss';
import '../winners-table/winners-table.scss';

import { BaseComponent } from '../base-component';

export interface WinnerRowData {
  color: string;
  name: string;
  wins: number;
  time: number;
}

export interface WinnerData {
  id: number;
  wins: number;
  time: number;
}

export class WinnerTableRow extends BaseComponent {
  // public winnersTableRow: BaseComponent;

  constructor(carData: WinnerRowData) {
    super('div', ['winners-row']);

    this.element.innerHTML = `    
    <div class="winners-col"></div>
    <div class="winners-col">${carData.color}</div>
    <div class="winners-col">${carData.name}</div>
    <div class="winners-col">${carData.wins}</div>
    <div class="winners-col">${carData.time}</div></div>
    `;
  }
}
