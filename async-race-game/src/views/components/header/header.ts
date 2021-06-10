import '../button/button.scss';
import './header.scss';

import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class Header extends BaseComponent {
  public garageButton: Button;

  public winnersButton: Button;

  constructor() {
    super('nav', ['nav']);
    this.garageButton = new Button('to garage', 'to-garage', ['button', 'nav-buton-garage']);
    this.winnersButton = new Button('to winners', 'to-winners', ['button', 'nav-buton-winners']);
    this.element.appendChild(this.garageButton.button);
    this.element.appendChild(this.winnersButton.button);
  }
}
