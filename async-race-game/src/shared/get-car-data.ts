import { WinnerData, WinnerRowData } from '../views/components/winners-table-row/winners-table-row';
import { getCar, getWinners } from '../api/api';
import { NewCarData } from '../views/components/car/car';

export const getWinnerCarColor = (carData: NewCarData): string => carData.color;

export const getWinnerName = (carData: NewCarData): string => carData.name;

export const getWinnerRowData = ({ id, wins: carWins, time: winTime }: WinnerData): WinnerRowData => {
  let carName: string;
  let carColor: string;
  getCar(id).then((result) => {
    carName = getWinnerName(result);
    carColor = getWinnerName(result);
  });
  return {
    color: carColor,
    name: carName,
    wins: carWins,
    time: winTime,
  };
};
