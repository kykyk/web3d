import {Component} from '@angular/core';


@Component({
    selector: 'main-app',
    template: `<h1>Hello, I {{name}}</h1>`,
})
export class MainApp {
    name = 'ANGULAR 2';
}
