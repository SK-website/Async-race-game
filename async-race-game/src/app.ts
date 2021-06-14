import './styles.scss';
import { carDataAutoGeneration } from './shared/randomChoise';
import { Header } from './views/components/header/header';
import { GaragePage } from './views/pages/garage';
import { WinnersPage } from './views/pages/winners';
import * as serv from './api/api';
import * as win from './shared/get-car-data';
import { NewCarData } from './views/components/car/car';
import { NewCar } from './views/components/new-car/new-car';
import { WinnerRowData, WinnerData } from './views/components/winners-table-row/winners-table-row';

// import { Car } from './views/components/car/car';

export class App {
  private readonly header: Header;

  private readonly garagePage: GaragePage;

  private mainElement: HTMLElement | null;

  private winnersPage: WinnersPage;

  constructor() {
    this.header = new Header();
    this.garagePage = new GaragePage();
    this.mainElement = document.getElementById('main');
    this.winnersPage = new WinnersPage();

    this.header.winnersButton.onButtonClick = () => {
      this.showWinners();
    };

    this.header.garageButton.onButtonClick = () => {
      this.showGarage();
    };

    this.garagePage.controlBlock.createBlock.createButton.onButtonClick = () => {
      const userInput = this.garagePage.controlBlock.createBlock.getCarCreateData();
      serv.createCar(userInput).then((result) => this.garagePage.addCar(result));
    };

    this.garagePage.controlBlock.updateBlock.updateButton.onButtonClick = () => {
      const currentCar = this.garagePage.currentCar as NewCar;
      const currentCarId = currentCar.car.id;
      const userInput = this.garagePage.controlBlock.updateBlock.getCarUpdateData();
      serv.updateCar(userInput, currentCarId).then((result) => GaragePage.setCarUpdate(result, currentCar));
    };

    this.garagePage.controlBlock.manageBlock.generateButton.onButtonClick = () => {
      App.carAutoGeneration();
      this.showChangedCarList();
    };
    this.garagePage.onDeleteButtonClick = () => {
      this.showChangedCarList();
      console.log('onDeleteButtonClick works');
    };
    this.garagePage.pagesControl.nextButton.onButtonClick = () => {
      const currentPageNumber = Number(this.garagePage.pageNumber.element.innerHTML);
      const carsTotalAmount = Number(this.garagePage.carsTotalAmount.element.innerHTML);
      console.log(currentPageNumber, carsTotalAmount);
      if (carsTotalAmount / currentPageNumber > 7) {
        const newPage = currentPageNumber + 1;
        this.showChangedCarList(newPage);
      }
    };
    this.garagePage.pagesControl.prevButton.onButtonClick = () => {
      const currentPageNumber = Number(this.garagePage.pageNumber.element.innerHTML);
      if (currentPageNumber > 1) {
        const newPage = currentPageNumber - 1;
        this.showChangedCarList(newPage);
        console.log('new page  ', newPage);
      }
    };
  }

  showGarage(page = 1): void {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
      this.mainElement.insertAdjacentElement('beforebegin', this.header.element);
      this.mainElement.appendChild(this.garagePage.element);
      serv.getCars(page).then((result) => {
        this.showCars(result.result);
        if (result.totalAmount) {
          this.garagePage.addCarsAmount(result.totalAmount);
        }
        this.garagePage.addPageNumber(page);
      });
    }
  }

  showChangedCarList(page = 1): void {
    if (this.mainElement) {
      this.garagePage.carsContainer.element.innerHTML = '';
      serv.getCars(page).then((result) => {
        this.showCars(result.result);
        if (result.totalAmount) {
          this.garagePage.addCarsAmount(result.totalAmount);
        }
      });
      console.log('page Number ', page);
      this.garagePage.addPageNumber(page);
    }
  }

  showWinners(page = 1): void {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
      console.log('Winners should be shown');
      this.mainElement.appendChild(this.winnersPage.element);
      serv.getWinners(page).then((result) => {
        this.showWinnersRows(result.result);
        if (result.totalAmount) {
          this.winnersPage.addWinnersAmount(result.totalAmount);
        }
        this.winnersPage.addPageNumber(page);
      });
    }
  }

  showWinnersRows(winners: WinnerData[]): void {
    for (let i = 0; i < winners.length; i++) {
      win.getWinnerRowData(winners[i]).then((result) => this.winnersPage.addWinnerRow(result));
    }
  }

  showCars(getCarsResult: Array<NewCarData>): void {
    for (let i = 0; i < getCarsResult.length; i++) {
      this.garagePage.addCar(getCarsResult[i]);
    }
  }

  static carAutoGeneration(): void {
    for (let i = 0; i < 1; i++) {
      const newCarData = carDataAutoGeneration();
      serv.createCar(newCarData);
    }
  }
}
