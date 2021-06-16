import * as apserv from '../api/api';

const draw = (time: number, timePassed: number, car: HTMLElement, width: number | undefined): void => {
  console.log('draw works');
  if (width) {
    const steplength = width * (timePassed / time);
    car.style.left = `${steplength}px`;

    // car.style.left = `${timePassed / steplength}px`;
  }
};

export const toBox = (car: HTMLElement) => {
  console.log('toBox works');
  const a = car.closest('div');
  const width = a?.offsetWidth;
  if (width) {
    car.style.left = '0';
  }
};

export const getCarRaceTime = ({ velocity, distance }: apserv.StartCarData): number => distance / velocity;

export const startAnimation = async (id: number, car: HTMLElement): Promise<void> => {
  let cancel = false;
  const result = await apserv.startEngine(id);
  const time: number = getCarRaceTime(result);
  console.log(time);
  const start = Date.now();
  const a = car.closest('div');
  const width = a?.offsetWidth;
  console.log(width);
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
    console.log('toDriveMode     Stop car animation');
    cancel = true;
    // функция stop машинки
  }
  if (resultToDriveMode) console.log('finish');
};

export const startCarRace = async (id: number, car: HTMLElement): Promise<void> => {
  let cancel = false;
  const result = await apserv.startEngine(id);
  const time: number = getCarRaceTime(result);
  console.log(time);
  // функция start машинки
  startAnimation(time, car);
  const resultToDriveMode = await apserv.toDriveMode(id);

  if (!resultToDriveMode) {
    console.log('toDriveMode     Stop car animation');
    cancel = true;
    // функция stop машинки
  }
  if (resultToDriveMode) console.log('finish');
};
