import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainApp }  from './component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ MainApp ],
    bootstrap:    [ MainApp ]
})
export class AppModule { }
