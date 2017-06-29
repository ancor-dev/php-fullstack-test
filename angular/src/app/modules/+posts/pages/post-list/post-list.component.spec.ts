import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { CollectionModel } from 'app/models/collection.model';
import { PostListComponent } from './post-list.component';
import { PostApiService } from '../../services/post-api.service';
import { PostListDataService } from './post-list-data.service';

const postApiMock = {
  getList() {
    const collection = new CollectionModel({
      items: [],
    } as any);
    return Observable.of(collection);
  }
};

const postListDataMock = {
  init() {}
};

/**
 * @todo: finish tests
 */
describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PostApiService,
          useValue: postApiMock,
        },
        {
          provide: PostListDataService,
          useValue: postListDataMock,
        },
      ],
      declarations: [ PostListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
