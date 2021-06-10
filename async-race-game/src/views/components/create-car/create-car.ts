import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { ColorPick } from '../color-pick/color-pick';
import { Name } from '../name/name';

export class CreateCar extends BaseComponent {
  public createName: Name;

  private readonly createColor: ColorPick;

  public createButton: Button;

  constructor() {
    super('div', ['create-car']);
    this.createName = new Name('input-name-create', 'Set your supercar name!');
    this.createColor = new ColorPick('input-color-create');
    this.createButton = new Button('create', 'create-button', ['create-car-button']);
    this.element.appendChild(this.createName.name);
    this.element.appendChild(this.createColor.colorPick);
    this.element.appendChild(this.createButton.button);
  }

  getCarCreateData = (): Record<string, unknown> => {
    const carName = this.createName.name.value;
    const carColor = this.createColor.colorPick.value;
    console.log('carName = ', carName, 'carColor = ', carColor);
    return {
      name: carName,
      color: carColor,
    };
  };
}
