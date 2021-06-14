import { UpdateCar } from '../update-car/update-car';
import { ManageCar } from '../manage-car/manage-car';
import { CreateCar } from '../create-car/create-car';
import { BaseComponent } from '../base-component';

export class Control extends BaseComponent {
  public createBlock: CreateCar;

  public updateBlock: UpdateCar;

  public manageBlock: ManageCar;

  constructor() {
    super();
    this.createBlock = new CreateCar();
    this.updateBlock = new UpdateCar();
    this.manageBlock = new ManageCar();

    this.element.appendChild(this.createBlock.element);
    this.element.appendChild(this.updateBlock.element);
    this.element.appendChild(this.manageBlock.element);
  }
}
