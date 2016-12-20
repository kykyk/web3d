import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../menu-sidebar/MenuItem';
import {MenuItemService} from '../test/menu-item.service';

@Component({
    selector: 'main-app',
    template: `<h1>Hello, I {{title}}</h1>
<menu-sidebar [menuItems]="menu"></menu-sidebar>
<router-outlet></router-outlet>`,
    providers: [MenuItemService],
})
export class MainAppComponent implements OnInit {
    title: string = 'ANGULAR 2';
    menu: MenuItem[];

    constructor(private menuItemService: MenuItemService) {
    }

    ngOnInit() {
        this.getItemsMenu();
    }

    private getItemsMenu() {
        this.menu = this.menuItemService.getItemMenu();
    }
}
