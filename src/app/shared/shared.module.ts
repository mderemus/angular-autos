import { NgModule } from '@angular/core';

// TODO: Add modules that will be shared througout the app
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [],
	imports: [BrowserModule,
		BrowserAnimationsModule],
	exports: [BrowserModule,
		BrowserAnimationsModule]
})
export class SharedModule { }
