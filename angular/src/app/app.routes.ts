import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const ROUTES: Routes = [
  { path: '', loadChildren: './modules/+posts#PostsModule' },
  { path: '**', component: PageNotFoundComponent },
];
