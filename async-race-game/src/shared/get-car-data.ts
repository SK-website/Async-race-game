import { WinnerData, WinnerRowData } from '../views/components/winners-table-row/winners-table-row';
import { getCar, StartCarData, startEngine } from '../api/api';
import { NewCarData } from '../views/components/car/car';

export const getWinnerCarColor = (carData: NewCarData): string => carData.color;

export const getWinnerName = (carData: NewCarData): string => carData.name;

export const getWinnerRowData = async ({ id, wins: carWins, time: winTime }: WinnerData): Promise<WinnerRowData> => {
  const result = await getCar(Number(id));
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

export const getCarRaceTime = ({ velocity, distance }: StartCarData): number => distance / velocity;

export const startCarEngine = async (id: number) => {
  const result = await startEngine(id);
  const time: number = getCarRaceTime(result);
  return time;
};
