import './pages-control.scss';

import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class PagesControl extends BaseComponent {
  public readonly prevButton: Button;

  public readonly nextButton: Button;

  constructor() {
    super('div', ['pages-change-block']);
    this.prevButton = new Button('<< prev', 'prev', ['car-button', 'prev-button']);
    this.nextButton = new Button('next >>', 'next', ['car-button', 'next-button']);
    this.element.appendChild(this.prevButton.button);
    this.element.appendChild(this.nextButton.button);
  }
}
