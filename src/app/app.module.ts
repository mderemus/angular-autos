import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarListComponent } from './components/car-list/car-list.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';


// TODO: import any modules that will be used in the app

@NgModule({
	declarations: [AppComponent, CarListComponent],
	imports: [BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule,
		TableModule, DropdownModule, MultiSelectModule, SliderModule],
	providers: [HttpClientModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
