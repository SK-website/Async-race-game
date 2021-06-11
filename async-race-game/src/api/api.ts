import { NewCar } from '../views/components/new-car/new-car';

const base = 'http://localhost:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const createCar = async (body: Record<string, unknown>) => {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  console.log('it is result', result);
  const newCar = new NewCar(result);
};

export const updateCar = async (body: Record<string, unknown>, id: number) => {
  const url = garage + String(id);
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((result) => console.log('it is result' + result));
};

export const getCars = async (page: number = 1, limit: number = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const result = await response.json();
  const totalNumber = response.headers.get('X-Total-Count');
  console.log('getCars result  = ', result, totalNumber);
};
