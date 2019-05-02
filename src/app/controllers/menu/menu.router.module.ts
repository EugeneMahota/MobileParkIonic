import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu.component';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: 'stock', children: [
                    {path: '', loadChildren: '../stock/stock.module#StockModule'}
                ]
            },
            {
                path: 'profile', children: [
                    {path: '', loadChildren: '../profile/profile.module#ProfileModule'}
                ]
            },
            {
                path: 'card', children: [
                    {path: '', loadChildren: '../card/card.module#CardModule'}
                ]
            },
            {
                path: 'news', children: [
                    {path: '', loadChildren: '../news/news.module#NewsModule'}]
            },
            {
                path: 'attr', children: [
                    {path: '', loadChildren: '../attr/attr.module#AttrModule'}]
            },
            {path: '', redirectTo: 'card', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MenuRouterModule {
}
