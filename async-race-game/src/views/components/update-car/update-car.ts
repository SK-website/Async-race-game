import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { ColorPick } from '../color-pick/color-pick';
import { Name } from '../name/name';

export class UpdateCar extends BaseComponent {
  private readonly updateName: Name;

  private readonly updateColor: ColorPick;

  private readonly updateButton: Button;

  constructor() {
    super('div', ['update-car']);
    this.updateName = new Name('input-name-update', 'Change your supercar name!');
    this.updateColor = new ColorPick('input-color-update');
    this.updateButton = new Button('update', 'update-button', ['update-car-button']);
    this.element.appendChild(this.updateName.name);
    this.element.appendChild(this.updateColor.colorPick);
    this.element.appendChild(this.updateButton.button);
  }
}
