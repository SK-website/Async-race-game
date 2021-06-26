import { WinnerData } from '../views/components/winners-table-row/winners-table-row';
import { NewCarData } from '../views/components/car/car';

const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export interface GetCarsReturn {
  result: NewCarData[];
  totalAmount: string;
}
export interface GetWinnersResult {
  result: WinnerData[];
  totalAmount: string;
}
export interface StartCarData {
  velocity: number;
  distance: number;
}

export interface CreateWinnerData {
  id: number,
  wins: number,
  time: number
}

export const createCar = async (body: Record<string, unknown>): Promise<NewCarData> => {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = response.json();
  return result;
};

export const updateCar = async (body: Record<string, unknown>, id: number): Promise<NewCarData> => {
  const url = `${garage}/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = response.json();
  return result;
};

export const getCars = async (page = 1, limit = 7): Promise<GetCarsReturn> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const result: NewCarData[] = await response.json();
  let totalAmount = response.headers.get('X-Total-Count');
  if (typeof totalAmount !== 'string') {
    totalAmount = '0';
  }
  return { result, totalAmount };
};

export const getCar = async (id: number): Promise<NewCarData> => {
  const url = `${garage}/${id}`;
  const response = await fetch(url);
  const result = response.json();
  return result;
};

export const removeCar = async (id: number): Promise<Response> => {
  const url = `${garage}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const result = response.json();
  return result;
};
export const startEngine = async (id: number, status = 'started'): Promise<StartCarData> => {
  const url = `${engine}?id=${id}&status=${status}`;
  const response = await fetch(url);
  const result: StartCarData = await response.json();
  return result;
};
export const stopEngine = async (id: number, status = 'stopped'): Promise<void> => {
  const url = `${engine}?id=${id}&status=${status}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
export const toDriveMode = async (id: number, status = 'drive'): Promise<boolean> => {
  const url = `${engine}?id=${id}&status=${status}`;
  const response = await fetch(url);
  if (response.status === 200) {
    const result = await response.json();
    return result.success;
  }
  return false;
};

export const getWinners = async (page = 1, limit = 10, sort = 'wins', order = 'DESC'): Promise<GetWinnersResult> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const result: WinnerData[] = await response.json();
  let totalAmount = response.headers.get('X-Total-Count');
  if (typeof totalAmount !== 'string') {
    totalAmount = '0';
  }
  return { result, totalAmount };
};
export const checkWinner = async (id: number): Promise<WinnerData | null> => {
  const response = await fetch(`${winners}/${id}`);

  if (response.status === 200) {
    const result: WinnerData = await response.json();
    return result;
  }
  return null;
};

export const createWinner = async (body: CreateWinnerData): Promise<CreateWinnerData> => {
  const response = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  return result;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const url = `${winners}/${id}`;
  await fetch(url, {
    method: 'DELETE',
  });
};

export const updateWinner = async (body: Record<string, number>, id: number): Promise<void> => {
  const url = `${winners}/${id}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
};
