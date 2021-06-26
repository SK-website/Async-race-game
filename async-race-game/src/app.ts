import './styles.scss';
import { carDataAutoGeneration } from './shared/randomChoise';
import { Header } from './views/components/header/header';
import { GaragePage } from './views/pages/garage';
import { WinnersPage } from './views/pages/winners';
import * as serv from './api/api';
import * as win from './shared/get-car-data';
import * as an from './shared/animation';
import { NewCarData } from './views/components/car/car';
import { NewCar } from './views/components/new-car/new-car';
import { WinnerData } from './views/components/winners-table-row/winners-table-row';
import { Notice } from './views/components/notice/notice';

interface RaceResults {
  id: number,
  time: number,
  counter: number,
  startTime: number
}

export class App {
  private readonly header: Header;

  private readonly garagePage: GaragePage;

  private mainElement: HTMLElement | null;

  private winnersPage: WinnersPage;

  private engineStatus: string;

  static winnerRaceData: RaceResults = {
    id: 0,
    time: 0,
    counter: 0,
    startTime: 0,
  };

  constructor() {
    this.engineStatus = 'stopped';
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
      this.showGarage();
    };

    this.garagePage.controlBlock.updateBlock.updateButton.onButtonClick = () => {
      const currentCar = this.garagePage.currentCar as NewCar;
      const currentCarId = currentCar.car.id;
      const userInput = this.garagePage.controlBlock.updateBlock.getCarUpdateData();
      serv.updateCar(userInput, currentCarId).then((result) => GaragePage.setCarUpdate(result, currentCar));
    };
    this.garagePage.onDeleteButtonClick = () => {
      this.showChangedCarList();
    };
    this.garagePage.controlBlock.manageBlock.generateButton.onButtonClick = () => {
      App.carAutoGeneration();
      this.showChangedCarList();
    };

    this.garagePage.controlBlock.manageBlock.raceButton.onButtonClick = async () => {
      const currentPageNumber = parseInt(this.garagePage.pageNumber.element.innerHTML, 10);
      const cars = await serv.getCars(currentPageNumber);
      const carsIds: number[] = win.getCarsOnPageIds(cars.result);
      this.startRace(carsIds);
    };

    this.garagePage.controlBlock.manageBlock.resetButton.onButtonClick = async () => {
      const currentPageNumber = parseInt(this.garagePage.pageNumber.element.innerHTML, 10);
      const cars = await serv.getCars(currentPageNumber);
      const carsIds: number[] = win.getCarsOnPageIds(cars.result);
      this.sendCarsOnPageToBox(carsIds);
    };

    this.garagePage.pagesControl.nextButton.onButtonClick = () => {
      const currentPageNumber = parseInt(this.garagePage.pageNumber.element.innerHTML, 10);
      const carsTotalAmount = parseInt(this.garagePage.carsTotalAmount.element.innerHTML, 10);
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
      }
    };
    this.winnersPage.pagesControl.nextButton.onButtonClick = () => {
      const currentPageNumber = parseInt(this.winnersPage.pageNumber.element.innerHTML, 10);
      const winnersTotalAmount = parseInt(this.winnersPage.winnersTotalAmount.element.innerHTML, 10);
      if (winnersTotalAmount / currentPageNumber > 7) {
        const newPage = currentPageNumber + 1;
        this.showWinners(newPage);
      }
    };

    this.winnersPage.pagesControl.prevButton.onButtonClick = () => {
      const currentPageNumber = Number(this.winnersPage.pageNumber.element.innerHTML);
      if (currentPageNumber > 1) {
        const newPage = currentPageNumber - 1;
        this.showWinners(newPage);
      }
    };

    this.garagePage.onStartButtonClick = async () => {
      const currentCar = this.garagePage.currentCar as NewCar;
      currentCar.startButton.button.classList.add('inactive');
      const currentCarId: number = currentCar.car.id;
      const car = currentCar.car.carPictureContainer;
      await an.startAnimation(currentCarId, car);
      currentCar.boxButton.button.classList.remove('inactive');
      currentCar.boxButton.button.classList.add('active');
    };

    this.garagePage.onBoxButtonClick = async () => {
      const currentCar = this.garagePage.currentCar as NewCar;
      currentCar.startButton.button.classList.add('inactive');
      currentCar.boxButton.button.classList.add('inactive');
      const car = currentCar.car.carPictureContainer;
      an.toBox(car);
      currentCar.startButton.button.classList.remove('inactive');
      currentCar.boxButton.button.classList.add('inactive');
    };
  }

  showGarage(page = 1): void {
    if (this.mainElement) {
      NewCar.allNewCars = [];
      this.mainElement.innerHTML = '';
      this.garagePage.carsContainer.element.innerHTML = '';
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
      this.garagePage.addPageNumber(page);
    }
  }

  showWinners(page = 1): void {
    if (this.mainElement) {
      this.mainElement.innerHTML = '';
      this.winnersPage.winnersContainer.element.innerHTML = '';
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

  sendCarsOnPageToBox = (carsIds: number[]): void => {
    for (let i = 0; i < carsIds.length; i++) {
      const carId = carsIds[i];
      const car = NewCar.allNewCars.find((el) => el.id === carId);
      if (car) {
        an.toBox(car.car.carPictureContainer);
        car.startButton.button.classList.remove('inactive');
        car.boxButton.button.classList.add('inactive');
      }
    }
  };

  startRace = (carsIds: number[]): void => {
    App.winnerRaceData.id = 0;
    App.winnerRaceData.time = 0;
    App.winnerRaceData.counter = carsIds.length;
    App.winnerRaceData.startTime = Date.now();

    for (let i = 0; i < carsIds.length; i++) {
      const carId = carsIds[i];
      const car = NewCar.allNewCars.find((el) => el.id === carId);
      if (car) {
        // car.raceResult = 0;
        car.startButton.button.classList.add('inactive');
        this.startCarRace(carId, car.car.element).then((res) => {
          if (res) {
            if (App.winnerRaceData.time === 0 || (res < App.winnerRaceData.time)) {
              App.winnerRaceData.id = carId;
              App.winnerRaceData.time = res;
            }
          }
        });
      }
    }
  };

  static carAutoGeneration(): void {
    for (let i = 0; i < 100; i++) {
      const newCarData = carDataAutoGeneration();
      serv.createCar(newCarData);
    }
  }

  showNotice(name: string, time: number): void {
    const notice = new Notice(name, time);
    this.garagePage.element.appendChild(notice.element);

    setTimeout(() => { this.garagePage.element.removeChild(notice.element); }, 3000);
  }

  getWinner = async (): Promise<void> => {
    const winnerCar = NewCar.allNewCars.find((el) => el.id === App.winnerRaceData.id);

    let newBestTime = 0;
    if (winnerCar) {
      this.showNotice(winnerCar.car.name, App.winnerRaceData.time);
      const prevCarResult = await serv.checkWinner(winnerCar.id);

      if (prevCarResult) {
        winnerCar.wins = prevCarResult.wins + 1;
        if (prevCarResult.time > winnerCar.raceResult) {
          newBestTime = winnerCar.raceResult;
          await serv.updateWinner({
            wins: winnerCar.wins,
            time: newBestTime,
          }, winnerCar.id);
        } else if (prevCarResult.time <= winnerCar.raceResult) {
          await serv.updateWinner({
            wins: winnerCar.wins,
            time: prevCarResult.time,
          }, winnerCar.id);
        }
      } else if (!prevCarResult) {
        winnerCar.wins++;
        await serv.createWinner({
          id: winnerCar.id,
          wins: winnerCar.wins,
          time: winnerCar.raceResult,
        });
      }
    }
  };

  startCarRace = async (id: number, car: HTMLElement): Promise<number | void> => {
    await serv.startEngine(id);
    let raceTime = await an.startAnimation(id, car);
    App.winnerRaceData.counter--;

    const currentCarInst = NewCar.allNewCars.find((el) => el.id === id);
    currentCarInst?.boxButton.button.classList.remove('inactive');
    const newCarInstance = NewCar.allNewCars.find((el) => el.id === id);
    if (newCarInstance && (typeof raceTime === 'number')) {
      raceTime = Date.now() - App.winnerRaceData.startTime;

      if (App.winnerRaceData.time === 0 || raceTime < App.winnerRaceData.time) {
        App.winnerRaceData.id = id;
        App.winnerRaceData.time = raceTime;
        newCarInstance.raceResult = raceTime;
      }
      if (App.winnerRaceData.counter <= 0) {
        this.getWinner();
      }
    }
  };
}
