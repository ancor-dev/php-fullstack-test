import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        schemas: [ NO_ERRORS_SCHEMA ],
        declarations: [
          AppComponent,
        ],
      })
      /**
       * Compile template and css
       */
      .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it('should render title in a h1 tag', async(() => {
    const brand = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brand.nativeElement.textContent).toContain('Angular Demo');
  }));
});
