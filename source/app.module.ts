import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MainAppComponent}  from './app/main/main-app.component';
import {MenuSidebarComponent} from './app/menu-sidebar/menu-sidebar.component';
import {HttpModule} from "@angular/http";

import {AppRoutingModule} from "./app-routing.module";

import {Test1Component} from './app/test/test1.component';
import {Test2Component} from './app/test/test2.component';
import {LabsComponent} from "./app/labs/labs.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
    ],
    declarations: [
        MainAppComponent,
        MenuSidebarComponent,
        Test1Component,
        Test2Component,
        LabsComponent,
    ],
    bootstrap: [MainAppComponent]
})
export class AppModule {
}
