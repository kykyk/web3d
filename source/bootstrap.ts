import 'zone.js/dist/zone';
import 'reflect-metadata';
import {bootstrap} from 'angular2/platform/browser';
import { Component, NgModule } from 'angular2/core';


@Component({
    selector:'main-app',
    template:`<h1>Hello, I ANGULAR 2</h1>`,
})
export class MainApp{
    name = 'ANGULAR 2';
}

bootstrap(MainApp);
