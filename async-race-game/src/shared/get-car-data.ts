import { WinnerData, WinnerRowData } from '../views/components/winners-table-row/winners-table-row';
import * as apiserv from '../api/api';
import { NewCarData } from '../views/components/car/car';

export const getWinnerCarColor = (carData: NewCarData): string => carData.color;

export const getWinnerName = (carData: NewCarData): string => carData.name;

export const getWinnerRowData = async ({ id, wins: carWins, time: winTime }: WinnerData): Promise<WinnerRowData> => {
  const result = await apiserv.getCar(Number(id));
  console.log(result);
  const carName = getWinnerName(result);
  const carColor = getWinnerCarColor(result);
  console.log(carName, carColor);
  return {
    color: carColor,
    name: carName,
    wins: carWins,
    time: winTime,
  };
};

export const getCarRaceTime = ({ velocity, distance }: apiserv.StartCarData): number => distance / velocity;

export const startCarEngine = async (id: number): Promise<void> => {
  console.log('startCarEngine   works');
  await apiserv.startEngine(id).then((result) => {
    const time: number = getCarRaceTime(result);
    console.log(time);
    // функция start машинки
  });
  apiserv.toDriveMode(id).then((result) => {
    if (!result) {
      console.log('toDriveMode     Stop car animation');
      // функция stop машинки
    }
    if (result) console.log('finish');
  });
};

// export const startCarEngine = async (id: number) => {
//   console.log('startCarEngine   works');
//   const result = await apiserv.startEngine(id);
//   console.log('startEngine   ', result);
//   const time: number = getCarRaceTime(result);
//   console.log(time);
//   const isBroken = await apiserv.toDriveMode(id);
//   console.log('toDriveMode', isBroken);
//   if (!isBroken) console.log('Stop car animation');
//   if (isBroken) console.log('finish');
// };
