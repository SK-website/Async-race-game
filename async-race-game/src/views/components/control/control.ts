import { Fragment } from '../fragment';
import { UpdateCar } from '../update-car/update-car';
import { ManageCar } from '../manage-car/manage-car';
import { CreateCar } from '../create-car/create-car';

export class Control extends Fragment {
  public createBlock: CreateCar;

  private readonly updateBlock: UpdateCar;

  private readonly manageBlock: ManageCar;

  constructor() {
    super();
    this.createBlock = new CreateCar();
    this.updateBlock = new UpdateCar();
    this.manageBlock = new ManageCar();

    this.fragment.appendChild(this.createBlock.element);
    this.fragment.appendChild(this.updateBlock.element);
    this.fragment.appendChild(this.manageBlock.element);
  }
}
