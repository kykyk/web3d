import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Test1Component} from './app/test/test1.component';
import {Test2Component} from './app/test/test2.component';

const routes: Routes = [
    { path: '', redirectTo: '/test1', pathMatch: 'full' },
    {path: 'test1', component: Test1Component},
    {path: 'test2', component: Test2Component},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
