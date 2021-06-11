import './styles.scss';
import { Header } from './views/components/header/header';
import { GaragePage } from './views/pages/garage';
import { WinnersPage } from './views/pages/winners';
import { createCar, updateCar, getCars } from './api/api';
import { Car } from './views/components/car/car';

export class App {
  private readonly header: Header;

  private readonly garagePage: GaragePage;

  private appElement: HTMLCollectionOf<HTMLBodyElement>;

  private mainElement: HTMLElement | null;

  private winnersPage: WinnersPage;

  constructor() {
    this.header = new Header();
    this.garagePage = new GaragePage();
    this.mainElement = document.getElementById('main');
    this.appElement = document.getElementsByTagName('body');
    this.winnersPage = new WinnersPage();

    this.header.winnersButton.onButtonClick = () => {
      this.showWinners();
    };

    this.header.garageButton.onButtonClick = () => {
      this.showGarage();
    };

    this.garagePage.controlBlock.createBlock.createButton.onButtonClick = () => {
      const carData = this.garagePage.controlBlock.createBlock.getCarCreateData();
      createCar(carData);
    };
  }

  showGarage(): void {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
      console.log('Garage should be shown', this.garagePage.element);
      this.mainElement.insertAdjacentElement('beforebegin', this.header.element);
      this.mainElement.appendChild(this.garagePage.element);
      const cars = getCars();
    }
  }

  showWinners(): void {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
      console.log('Winners should be shown');
      this.mainElement.appendChild(this.winnersPage.element);
    }
  }
}
