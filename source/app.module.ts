import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MainAppComponent}  from './app/main/main-app.component';
import {MenuSidebarComponent} from './app/menu-sidebar/menu-sidebar.component';
import {Test1Component} from './app/test/test1.component';
import {Test2Component} from './app/test/test2.component';

import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    declarations: [
        MainAppComponent,
        MenuSidebarComponent,
        Test1Component,
        Test2Component,
    ],
    bootstrap: [MainAppComponent]
})
export class AppModule {
}
