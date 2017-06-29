import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginationComponent } from './pagination.component';
import { CollectionModel } from 'app/models/collection.model';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display prev and next buttons but disabled', () => {
    const collection = new CollectionModel({ totalPages: 0 } as any);

    component.collection = collection;
    component.ngOnChanges({ collection: true } as any);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.page-item'));
    expect(buttons.length).toBe(2);

    buttons.forEach((button) => {
      expect(button.classes['disabled']).toBeTruthy();
    });
  });

  it('should display prev, next and 3 page buttons, one of it is active', () => {
    const collection = new CollectionModel({ currentPage: 2, totalPages: 3 } as any);

    component.collection = collection;
    component.ngOnChanges({ collection: true } as any);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.page-item'));
    expect(buttons.length).toBe(5);

    buttons.forEach((button) => {
      expect(button.classes['disabled']).toBeFalsy();
    });

    const button = fixture.debugElement.query(By.css('.page-item:nth-child(3)'));
    expect(button).toBeTruthy();

    expect(button.classes['active']).toBeTruthy();
  });

  it('changePage event should works', () => {
    const collection = new CollectionModel({ currentPage: 1, totalPages: 2 } as any);
    let res;

    component.collection = collection;
    component.ngOnChanges({ collection: true } as any);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.page-item > a'));


    component.changePage.subscribe((page) => res = page);

    buttons[ 2 ].triggerEventHandler('click', null);
    expect(res).toBe(2);

    buttons[ 1 ].triggerEventHandler('click', null);
    expect(res).toBe(2);
  });

});
