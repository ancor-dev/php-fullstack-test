import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PostViewComponent } from './post-view.component';
import { PostModel } from '../../models/post.model';

const routeMock = {
  data: Observable.of({ post: { author: {} } } as { post: PostModel }),
};

/**
 * @todo: finish the unit test
 */
describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostViewComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeMock,
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
