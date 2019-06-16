import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CarsService {
	constructor(private httpClient: HttpClient) { }

	// TODO: methods to return data from json file or create an in memory web api
	public getCars(): Observable<any> {
		return this.httpClient.get('assets/cars-data.json');
	}

}
