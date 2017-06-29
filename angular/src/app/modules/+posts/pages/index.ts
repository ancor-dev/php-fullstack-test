import { PostComponent } from './post-list/post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostViewResolver } from './post-view/post-view.resolver';
import { PostListDataService } from './post-list/post-list-data.service';

export { PostComponent } from './post-list/post/post.component';
export { PostListComponent } from './post-list/post-list.component';
export { PostViewComponent } from './post-view/post-view.component';
export { PostViewResolver } from './post-view/post-view.resolver';
export { PostListDataService } from './post-list/post-list-data.service';


export const PAGES_DECLARATIONS = [
  PostComponent,
  PostListComponent,
  PostViewComponent,
];
export const PAGES_PROVIDERS = [
  PostListDataService,
  PostViewResolver,
];
