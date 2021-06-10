import './new-car.scss';

import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class NewCar extends BaseComponent {
  private readonly selectButton: Button;

  private readonly removeButton: Button;

  private readonly startButton: Button;

  private readonly boxButton: Button;

  private readonly carPictureContainer: BaseComponent;

  constructor() {
    super('div', ['car']);
    this.selectButton = new Button('select', 'select', ['car-button', 'select-car-button']);
    this.removeButton = new Button('remove', 'remove', ['car-button', 'remove-car-button']);
    const name = document.createElement('p');
    name.classList.add('car-name');

    const row1 = document.createElement('div');
    row1.classList.add('row-1');
    row1.appendChild(this.selectButton.button);
    row1.appendChild(this.removeButton.button);
    row1.appendChild(name);

    this.startButton = new Button('a', 'start', ['car-button', 'start-car-button']);
    this.boxButton = new Button('b', 'box', ['car-button', 'box-car-button']);

    const row2 = document.createElement('div');
    row2.classList.add('row-2');
    row2.appendChild(this.startButton.button);
    row2.appendChild(this.boxButton.button);

    this.carPictureContainer = new BaseComponent('div', ['car-picture-container']);
    const flagContainer = document.createElement('div');
    flagContainer.classList.add('flag-container');
    const row3 = document.createElement('div');
    row3.classList.add('row-3');
    row3.appendChild(this.carPictureContainer.element);
    row3.appendChild(flagContainer);

    this.element.appendChild(row1);
    this.element.appendChild(row2);
    this.element.appendChild(row3);
  }
}
