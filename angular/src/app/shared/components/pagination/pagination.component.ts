import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { CollectionModel } from 'app/models/collection.model';

/**
 * Note: this is just example how it can be implemented.
 * There is many packages that implements pagination component, no need to do it from scratch.
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [ `
  ` ],
})
export class PaginationComponent implements OnChanges {

  // -------------------------------------------------------------------------
  // Inputs / Outputs
  // -------------------------------------------------------------------------

  @Input()
  public collection: CollectionModel<any>;

  @Output()
  public changePage = new EventEmitter<number>();

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  public pages: number[];

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  public constructor() { }

  // -------------------------------------------------------------------------
  // Lifecycle Callbacks
  // -------------------------------------------------------------------------

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['collection'] && this.collection) {
      this.pages = Array(this.collection.totalPages).fill(1).map((x, i) => i + 1);
    }
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  public isCurrent(page: number): boolean {
    return page === (this.collection && this.collection.currentPage);
  }

  public onChangePage(page: number): void {
    if (!this.isCurrent(page)) {
      this.changePage.emit(page);
    }
  }

}
