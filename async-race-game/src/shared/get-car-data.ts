import { WinnerData, WinnerRowData } from '../views/components/winners-table-row/winners-table-row';
import * as apiserv from '../api/api';
import { NewCarData } from '../views/components/car/car';

export const getWinnerCarColor = (carData: NewCarData): string => carData.color;

export const getWinnerName = (carData: NewCarData): string => carData.name;

export const getWinnerRowData = async ({ id, wins: carWins, time: winTime }: WinnerData): Promise<WinnerRowData> => {
  const result = await apiserv.getCar(Number(id));
  const carName = getWinnerName(result);
  const carColor = getWinnerCarColor(result);
  return {
    color: carColor,
    name: carName,
    wins: carWins,
    time: winTime,
  };
};

export const getCarsOnPageIds = (result: NewCarData[]): number[] => {
  const ids: number[] = [];
  for (let i = 0; i < result.length; i++) {
    const { id } = result[i];
    ids.push(id);
  }
  return ids;
};
