import './new-car.scss';

import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Car, NewCarData } from '../car/car';

export class NewCar extends BaseComponent {
	public selectButton: Button;

	public removeButton: Button;

	public startButton: Button;

	public boxButton: Button;

	public carName: HTMLElement;

	public car: Car;

	public road: BaseComponent;

	public id: number;

	public raceResult = 0;

	public wins = 0;

	static allNewCars: NewCar[] = [];

	constructor(carData: NewCarData) {
		super('div', ['car']);
		this.selectButton = new Button('select', 'select', ['car-button', 'select-car-button']);
		this.removeButton = new Button('remove', 'remove', ['car-button', 'remove-car-button']);
		this.carName = document.createElement('p');
		this.carName.classList.add('car-name');
		this.carName.innerHTML = `${carData.name}`;
		this.carName.dataset.id = `${carData.id}`;

		const row1 = document.createElement('div');
		row1.classList.add('row-1');
		row1.appendChild(this.selectButton.button);
		row1.appendChild(this.removeButton.button);
		row1.appendChild(this.carName);

		this.startButton = new Button('a', 'start', ['car-button', 'start-car-button']);
		this.boxButton = new Button('b', 'box', ['car-button', 'box-car-button', 'inactive']);

		const row2 = document.createElement('div');
		row2.classList.add('row-2');
		row2.appendChild(this.startButton.button);
		row2.appendChild(this.boxButton.button);

		this.car = new Car(carData);
		this.id = carData.id;

		const flagContainer = document.createElement('div');
		flagContainer.classList.add('flag-container');
		this.road = new BaseComponent('div', ['road']);
		this.road.element.appendChild(this.car.element);
		this.road.element.appendChild(flagContainer);

		this.element.appendChild(row1);
		this.element.appendChild(row2);
		this.element.appendChild(this.road.element);
	}
}
