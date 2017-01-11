import {Injectable} from '@angular/core';
import {MenuItem} from '../menu-sidebar/MenuItem';

@Injectable()
export class MenuItemService {
    getItemMenu(): MenuItem[] {
        return [
            {url: '/test1', name: 'test1'},
            {url: '/test2', name: 'test2'},
            {url: '/labs', name: 'labs'},
        ];
    }
}
