import { Routes } from '@angular/router';

import {
  PostListComponent,

  PostViewComponent,
  PostViewResolver,
} from './pages';

export const ROUTES: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'post/:slug',
    component: PostViewComponent,
    resolve: {
      post: PostViewResolver,
    },
  },
];
