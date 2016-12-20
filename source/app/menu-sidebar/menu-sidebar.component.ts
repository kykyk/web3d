import {Component, Input} from '@angular/core';
import {MenuItem} from './MenuItem';

@Component({
    selector: 'menu-sidebar',
    templateUrl: 'app/menu-sidebar/menu-sidebar.html',
})
export class MenuSidebarComponent {
    @Input()
    menuItems: MenuItem[];
}
