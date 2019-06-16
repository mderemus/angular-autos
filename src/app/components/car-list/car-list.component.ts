import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { Car } from '../../shared/models/Car';
import { SelectItem } from '../../shared/interfaces/iSelectItem';

@Component({
	selector: 'app-car-list',
	templateUrl: './car-list.component.html',
	styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
	cars: Car[];
	cols: any[];
	yearFilter: number;
	priceFilter: number;
	maxYear: number;
	makes: SelectItem[] = [];
	colors: SelectItem[] = [];
	yesNoOptions: SelectItem[] = [];
	yearTimeout: any;
	priceTimeout: any;

	selectedColumns: any[];

	constructor(private carService: CarsService) { }

	ngOnInit() {
		this.carService.getCars().subscribe(cars => {
			this.cars = cars;
			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			});

			for (let carData of this.cars) {
				// Formatting for viewer's sake
				carData.hasHeatedSeats = this.trueFalseRename(carData.hasHeatedSeats);
				carData.hasSunroof = this.trueFalseRename(carData.hasSunroof);
				carData.isFourWheelDrive = this.trueFalseRename(carData.isFourWheelDrive);
				carData.hasLowMiles = this.trueFalseRename(carData.hasLowMiles);
				carData.hasPowerWindows = this.trueFalseRename(carData.hasPowerWindows);
				carData.hasNavigation = this.trueFalseRename(carData.hasNavigation);
				carData.priceValue = carData.price;
				carData.price = formatter.format(+carData.price);
			}


			this.loadMakesToSelect();
			this.loadColorsToSelect();
		});

		this.cols = [
			{ field: '_id', header: 'ID', display: 'table-cell' },
			{ field: 'price', header: 'Price', display: 'table-cell' },
			{ field: 'year', header: 'Year', display: 'table-cell' },
			{ field: 'make', header: 'Make', display: 'table-cell' },
			{ field: 'color', header: 'Color', display: 'table-cell' },
			{ field: 'hasHeatedSeats', header: 'Heated Seats', display: 'table-cell' },
			{ field: 'hasNavigation', header: 'Navigation', display: 'table-cell' },
			{ field: 'hasPowerWindows', header: 'Power Windows', display: 'table-cell' },
			{ field: 'hasSunroof', header: 'Sunroof', display: 'table-cell' },
			{ field: 'hasLowMiles', header: 'Low Miles', display: 'table-cell' },
			{ field: 'isFourWheelDrive', header: '4WD', display: 'table-cell' }
		];


		const headerFilter = (/\bID|\bHeated Seats|\bNavigation|\bPrice Value/g);
		this.selectedColumns = this.cols.filter(a => a.header.search(headerFilter));
		this.maxYear = new Date().getFullYear();
		this.maxYear += 2;

		this.yesNoOptions = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }];
	}

	onYearChange(event: any, dt: any) {
		if (this.yearTimeout) {
			clearTimeout(this.yearTimeout);
		}

		this.yearTimeout = setTimeout(() => {
			dt.filter(event.value, 'year', 'gt');
		}, 250);
	}

	onPriceChange(event: any, dt: any) {
		if (this.priceTimeout) {
			clearTimeout(this.priceTimeout);
		}

		this.priceTimeout = setTimeout(() => {
			dt.filter(event.value, 'priceValue', 'lt');
		}, 250);
	}

	loadMakesToSelect() {
		for (const carData of this.cars) {
			this.makes.push({ label: carData.make, value: carData.make });
		}
		this.makes = this.removeDuplicates(this.makes, 'label');
		this.makes.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
	}

	loadColorsToSelect() {
		for (const carData of this.cars) {
			this.colors.push({ label: carData.color, value: carData.color });
		}
		this.colors = this.removeDuplicates(this.colors, 'label');
		this.colors.sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
	}

	removeDuplicates(myArray: any[], prop: any) {
		return myArray.filter((obj, pos, arr) => {
			return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
		});
	}

	trueFalseRename(value: string) {
		let newValue = 'Yes';
		return newValue = value.toString() === 'true' ? 'Yes' : 'No';
	}

}

