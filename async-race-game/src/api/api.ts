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

// export interface WinnerData {
//   id: number;
//   wins: number;
//   time: number;
// }

export const createCar = async (body: Record<string, unknown>) => {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = response.json();
  return result;
};

export const updateCar = async (body: Record<string, unknown>, id: number) => {
  const url = `${garage}/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = response.json();
  console.log('it is result', result);
  return result;
};

export const getCars = async (page = 1, limit = 7): Promise<GetCarsReturn> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const result: NewCarData[] = await response.json();
  console.log(result);
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
  console.log('it is result', result);
  return result;
};

export const removeCar = async (id: number): Promise<Response> => {
  const url = `${garage}/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const result = response.json();
  console.log('it is result of delete', result);
  return result;
};
export const startEngine = async (id: number, status = 'start'): Promise<StartCarData> => {
  const url = `${engine}?_id=${id}&_status=${status}`;
  const response = await fetch(url);
  const result: StartCarData = await response.json();
  console.log(result);

  return result;
};
export const toDriveMode = async (id: number, status = 'drive'): Promise<boolean> => {
  const url = `${engine}?_id=${id}&_status=${status}`;
	try{ const response = await fetch(url);
  const result = await response.json();
  console.log(result);
} catch (err) {
	if (err === "404")
}
) {

}
 
  return result.success;
};

export const getWinners = async (page = 1, limit = 10, sort = 'wins', order = 'DESC'): Promise<GetWinnersResult> => {
  console.log('getWinners works');
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  const result: WinnerData[] = await response.json();
  let totalAmount = response.headers.get('X-Total-Count');
  if (typeof totalAmount !== 'string') {
    totalAmount = '0';
  }
  console.log({ result, totalAmount });
  return { result, totalAmount };
};
