import { BaseComponent } from '../components/base-component';
import { Control } from '../components/control/control';
import { NewCar } from '../components/new-car/new-car';
import { PagesControl } from '../components/pages-control/pages-control';

export class GaragePage extends BaseComponent {
  public controlBlock: Control;

  // private readonly car: NewCar;

  private readonly garageTitle: BaseComponent;

  private readonly pageNumber: BaseComponent;

  private readonly pagesControl: PagesControl;

  constructor() {
    super();
    this.controlBlock = new Control();

    const paginationContainer = new BaseComponent('div', ['pagination']);
    this.garageTitle = new BaseComponent('p', ['page-title']);
    this.garageTitle.element.innerHTML = `
    Garage ()`;
    this.pageNumber = new BaseComponent('p', ['page-namber']);
    this.pageNumber.element.innerHTML = `
    Page #`;
    paginationContainer.element.appendChild(this.garageTitle.element);
    paginationContainer.element.appendChild(this.pageNumber.element);

    // this.car = new NewCar(color);
    this.pagesControl = new PagesControl();

    this.element.appendChild(this.controlBlock.fragment);
    this.element.appendChild(paginationContainer.element);
    // this.element.appendChild(this.car.element);
  }

  addCar(name: string, color: string, id: number): void {
    const newLine = new NewCar(name, color, id);
    this.element.appendChild(newLine.element);
  }

  addPageControl(): void {
    this.element.appendChild(this.pagesControl.element);
  }
}
