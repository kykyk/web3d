import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Test1Component} from './app/test/test1.component';
import {Test2Component} from './app/test/test2.component';
import {LabsComponent} from "./app/labs/labs.component";

const ROUTES: Routes = [
    { path: '', redirectTo: '/test1', pathMatch: 'full' },
    {path: 'test1', component: Test1Component},
    {path: 'test2', component: Test2Component},
    {path: 'labs', component: LabsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
