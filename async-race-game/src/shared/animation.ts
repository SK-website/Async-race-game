import * as apserv from '../api/api';
import { ROADWIDTH } from '../app'
export interface GetRaceReturn {
  id: number;
  time: number;
}


const draw = (time: number, timePassed: number, car: HTMLElement, width: number | undefined): void => {
  if (width && width > 0) {
    console.log('drow works', 'width =', width, 'car === ', car)
    const steplength = width * (timePassed / time);
    car.style.left = `${steplength}px`;
  }
};

export const toBox = (car: HTMLElement): void => {
  // const a = car.closest('div');
  // const width = a?.offsetWidth;
  const width = ROADWIDTH;
  console.log(ROADWIDTH, 'ROADWIDTH')
  if (width) {
    car.style.left = '0';
  }
};

export const getCarRaceTime = ({ velocity, distance }: apserv.StartCarData): number => distance / velocity;

export const startAnimation = async (id: number, car: HTMLElement): Promise<number | void | undefined> => {
  let cancel = false;
  // const a = car.closest('div');
  // console.log('car ', car, '  closest div ===', a)
  // const width = a?.offsetWidth;
  // console.log('width ===', width)
  const width = ROADWIDTH;
  console.log(ROADWIDTH, 'ROADWIDTH')


  const result = await apserv.startEngine(id);
  const time: number = getCarRaceTime(result);
  const start = Date.now();

  const timer = setInterval(() => {
    const timePassed = Date.now() - start;
    if (timePassed >= time || cancel === true) {
      clearInterval(timer);
      return;
    }
    draw(time, timePassed, car, width);
  }, 20);
  const resultToDriveMode = await apserv.toDriveMode(id);
  if (!resultToDriveMode) {
    cancel = true;
  }
  if (resultToDriveMode) return time;
};
