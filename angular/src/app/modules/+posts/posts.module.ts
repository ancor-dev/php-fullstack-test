import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';

import { ROUTES } from './posts.routes';
import { SERVICES } from './services';
import { COMPONENTS } from './components';

console.log('%c`Posts` page bundle loaded asynchronously', 'color: gray');

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
     ...SERVICES,
  ],
})
export class PostsModule {
}
