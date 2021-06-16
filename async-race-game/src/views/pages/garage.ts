import { BaseComponent } from '../components/base-component';
import { Control } from '../components/control/control';
import { NewCar } from '../components/new-car/new-car';
import { PagesControl } from '../components/pages-control/pages-control';
import { NewCarData } from '../components/car/car';
import { removeCar } from '../../api/api';

export class GaragePage extends BaseComponent {
  public currentCar: unknown;

  public controlBlock: Control;

  public carsTotalAmount: BaseComponent;

  public pageNumber: BaseComponent;

  public pagesControl: PagesControl;

  public carsContainer: BaseComponent;

  public onDeleteButtonClick: (() => void) | null = null;

  public onStartButtonClick: (() => void) | null = null;

  public onBoxButtonClick: (() => void) | null = null;

  constructor() {
    super();

    this.currentCar = null;

    this.controlBlock = new Control();
    this.carsContainer = new BaseComponent();

    const paginationContainer = new BaseComponent('div', ['pagination']);
    const garageTitle = new BaseComponent('p', ['page-title']);
    garageTitle.element.innerHTML = `
    Cars in garage - `;
    this.carsTotalAmount = new BaseComponent('span', ['page-title']);
    this.carsTotalAmount.element.innerHTML = '';
    garageTitle.element.appendChild(this.carsTotalAmount.element);
    const page = new BaseComponent('p', ['page-namber']);
    page.element.innerHTML = `
    Page #`;
    this.pageNumber = new BaseComponent('span', ['page-namber']);
    this.pageNumber.element.innerHTML = '';
    page.element.appendChild(this.pageNumber.element);
    paginationContainer.element.appendChild(garageTitle.element);
    paginationContainer.element.appendChild(page.element);

    // this.car = new NewCar(color);
    this.pagesControl = new PagesControl();

    this.element.appendChild(this.controlBlock.element);
    this.element.appendChild(paginationContainer.element);
    this.element.appendChild(this.carsContainer.element);
    this.element.appendChild(this.pagesControl.element);
  }

  addCar(carData: NewCarData): void {
    const newLine = new NewCar(carData);

    this.carsContainer.element.appendChild(newLine.element);
    this.controlBlock.createBlock.createName.name.value = '';

    newLine.selectButton.onButtonClick = () => {
      this.currentCar = newLine;
      this.controlBlock.updateBlock.updateName.name.value = newLine.car.name;
      this.controlBlock.updateBlock.updateColor.colorPick.value = newLine.car.color;
    };

    newLine.removeButton.onButtonClick = () => {
      this.currentCar = newLine;
      const removableCar = this.currentCar as NewCar;
      const carId = removableCar.car.id;
      removeCar(carId);
      this.onDeleteButtonClick?.();
    };

    newLine.startButton.onButtonClick = () => {
      this.currentCar = newLine;
      this.onStartButtonClick?.();
    };
    newLine.boxButton.onButtonClick = () => {
      this.currentCar = newLine;
      this.onBoxButtonClick?.();
    };
  }

  static setCarUpdate(data: NewCarData, car: NewCar): void {
    car.carName.innerHTML = data.name;
    car.car.name = data.name;
    car.car.color = data.color;

    car.car.element.innerHTML = `
    <svg
    class="car-picture-color"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="68px"
    height="35px"
    viewBox="0 0 79.536 57"
    style="enable-background: new 0 0 79.536 10"
    xml:space="preserve"
  >
    <g>
      <path
        style="fill: ${data.color}"
        d="M15.532,56.706c-3.977,0-7.213-3.242-7.213-7.197c0-3.998,3.236-7.224,7.213-7.224
c3.987,0,7.226,3.226,7.226,7.224C22.758,53.463,19.519,56.706,15.532,56.706z M15.532,45.604c-2.128,
0-3.876,1.75-3.876,3.883
c0,2.129,1.748,3.879,3.876,3.879c2.141,0,3.886-1.75,3.886-3.879C19.418,47.354,17.673,45.604,15.
532,45.604z M64.137,56.706
c-3.987,0-7.219-3.242-7.219-7.197c0-3.998,3.231-7.224,7.219-7.224c3.977,0,7.208,3.226,7.208,7.224
C71.345,53.463,68.113,56.706,64.137,56.706z M64.137,45.604c-2.144,0-3.895,1.75-3.895,3.883c0,2.129,
1.751,3.879,3.895,3.879
c2.139,0,3.884-1.75,3.884-3.879C68.021,47.354,66.275,45.604,64.137,45.604z M78.138,
44.091c0-7.011-4.365-7.842-4.365-7.842
c-6.426-0.912-17.496-1.38-17.496-1.38c-1.016-1.766-5.707-12.039-8.44-12.039c-0.911,0-20.508,0-23.975,0
c-3.472,0-9.167,10.024-10.413,12.285c0,0-4.36,0.758-6.416,1.219c-1.142,0.265-4.301,0.324-4.301,9.155H0v3.997h6.654
c0-4.908,3.982-8.885,8.878-8.885c4.914,0,8.886,3.977,8.886,8.885h30.827c0-4.908,3.967-8.885,8.892-8.885
c4.898,0,8.875,3.977,8.875,8.885h6.524v-5.396H78.138z M35.589,34.191H21.751c1.872-5.831,5.339-9.994,6.801-9.994
c1.841,0,7.037,0,7.037,0V34.191z M38.168,34.191v-9.994c0,0,7.141,0,8.974,0c1.854,0,5.893,8.461,7.032,10.625L38.
168,34.191z"
      />
    </g>
  </svg>`;
  }

  addPageControl(): void {
    this.element.appendChild(this.pagesControl.element);
  }

  addCarsAmount(carsAmount: string): void {
    this.carsTotalAmount.element.innerHTML = `${carsAmount}`;
  }

  addPageNumber(n: number): void {
    this.pageNumber.element.innerHTML = `${String(n)}`;
  }
}
