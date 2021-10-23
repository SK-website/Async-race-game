import './notice.css';
import { BaseComponent } from '../base-component';

export class Notice extends BaseComponent {
  constructor(name: string, time: number) {
    super('div', ['notice', 'hidden']);
    this.element.textContent = `${name} has won the race with time ${time / 1000}s!`;
  }
}
