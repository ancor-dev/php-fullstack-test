import { PostComponent } from './post-list/post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostViewResolver } from './post-view/post-view.resolver';

export { PostComponent } from './post-list/post/post.component';
export { PostListComponent } from './post-list/post-list.component';
export { PostViewComponent } from './post-view/post-view.component';
export { PostViewResolver } from './post-view/post-view.resolver';


export const PAGES_DECLARATIONS = [
  PostComponent,
  PostListComponent,
  PostViewComponent,
];
export const PAGES_PROVIDERS    = [
  PostViewResolver,
];
