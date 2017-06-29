import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

import { SharedModule } from 'app/shared';

import { ROUTES } from './posts.routes';
import { SERVICES } from './services';
import { PAGES_DECLARATIONS, PAGES_PROVIDERS } from './pages';
import { COMPONENTS } from './components';

console.log('%c`Posts` page bundle loaded asynchronously', 'color: gray');

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    MarkdownToHtmlModule.forRoot(),
  ],
  exports: [
  ],
  declarations: [
    ...PAGES_DECLARATIONS,
    ...COMPONENTS,
  ],
  providers: [
    ...PAGES_PROVIDERS,
    ...SERVICES,
  ],
})
export class PostsModule {
}
