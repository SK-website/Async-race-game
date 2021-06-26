const CARBRAND: string[] = ['Ford', 'Nissan', 'Kia', 'Buick', 'BMW', 'Karl', 'Chevrolet', 'Tesla', 'Audi', 'Ferrari'];
const CARMODEL: string[] = ['Almera', 'Rio', 'Q5', 'Mustang', 'X5', 'Night ghost', 'F1-2000', 'Wildcat', 'Camaro', 'Roadster'];

export const RandomFromRange = (min: number, max: number): number => {
  const randomNumber = Math.random();
  return Math.floor(min + (max - min) * randomNumber);
};

export const getRandomCarName = (): string => {
  const brandRandom = RandomFromRange(0, 9);
  const modelRandom = RandomFromRange(0, 9);
  return `${CARBRAND[brandRandom]} ${CARMODEL[modelRandom]}`;
};

export const getRandomCarColor = (): string => {
  const skipNumber = RandomFromRange(1, 4);
  let colorRandomR = RandomFromRange(125, 255);
  let colorRandomG = RandomFromRange(125, 255);
  let colorRandomB = RandomFromRange(125, 255);
  if (skipNumber === 1) {
    colorRandomR = 0;
  }
  if (skipNumber === 2) {
    colorRandomG = 0;
  }
  if (skipNumber === 3) {
    colorRandomB = 0;
  }

  const color = `rgb(${colorRandomR}, ${colorRandomG}, ${colorRandomB})`;
  return color;
};

export const carDataAutoGeneration = (): Record<string, string> => {
  const carName = getRandomCarName();
  const carColor = getRandomCarColor();
  return {
    name: carName,
    color: carColor,
  };
};
