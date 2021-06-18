import * as apserv from '../api/api';

export interface GetRaceReturn {
  id: number;
  time: number;
}

const draw = (time: number, timePassed: number, car: HTMLElement, width: number | undefined): void => {
  if (width && width > 0) {
    const steplength = width * (timePassed / time);
    car.style.left = `${steplength}px`;
  }
};

export const toBox = (car: HTMLElement): void => {
  const a = car.closest('div');
  const width = a?.offsetWidth;
  if (width) {
    car.style.left = '0';
  }
};

export const getCarRaceTime = ({ velocity, distance }: apserv.StartCarData): number => distance / velocity;

// eslint-disable-next-line consistent-return
export const startAnimation = async (id: number, car: HTMLElement): Promise<void | number> => {
  let cancel = false;
  const a = car.closest('div');
  console.log('car ', car, '  closest div ===', a);
  const width = a?.offsetWidth;
  console.log('width ===', width);

  const result = await apserv.startEngine(id);
  const time: number = getCarRaceTime(result);
  const start = Date.now();

  const timer = setInterval((): number | void => {
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
