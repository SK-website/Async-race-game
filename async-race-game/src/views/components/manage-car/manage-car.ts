import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class ManageCar extends BaseComponent {
  private readonly raceButton: Button;

  private readonly resetButton: Button;

  private readonly generateButton: Button;

  constructor() {
    super('div', ['manage-race']);
    this.raceButton = new Button('race', 'race-button', ['race-button']);
    this.resetButton = new Button('reset', 'reset-button', ['reset-button']);
    this.generateButton = new Button('generate cars', 'generate-button', ['generate-button']);
    this.element.appendChild(this.raceButton.button);
    this.element.appendChild(this.resetButton.button);
    this.element.appendChild(this.generateButton.button);
  }
}
