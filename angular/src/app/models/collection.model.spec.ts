import { CollectionModel } from './collection.model';
import { BaseModel } from './base-model';

class TestModel extends BaseModel<TestModel> {
  public name: string;

  constructor(data: any = {}) {
    super();

    this.fillAll(data, ['name']);
  }

  public static fromApi(data: object): TestModel {
    return new TestModel({ name: data[ 'name' ] });
  }

}

describe('CollectionModel', () => {

  it('All fields should be available to set via constructor', () => {
    const data = <CollectionModel<TestModel>> {
      totalItems: 100,
      totalPages: 20,
      currentPage: 2,
      items: [ new TestModel({ name: 'test-1' }), new TestModel({ name: 'test-2' }) ],
    };

    const ins = new CollectionModel(data);

    expect(ins.totalItems).toBe(100);
    expect(ins.totalPages).toBe(20);
    expect(ins.currentPage).toBe(2);
    expect(ins.items instanceof Array).toBeTruthy();
    expect(ins.items[ 0 ]).toBe(data.items[ 0 ]);
    expect(ins.items[ 1 ]).toBe(data.items[ 1 ]);
  });

  it('.fromApi() should create and fill instance', () => {
    const data = {
      total_items: 200,
      total_pages: 30,
      items: [ { name: 'test-11' }, { name: 'test-22' } ],
    };

    const ins = CollectionModel.fromApi(data, TestModel);

    expect(ins.totalItems).toBe(200);
    expect(ins.totalPages).toBe(30);
    expect(ins.items instanceof Array).toBeTruthy();
    expect(ins.items[ 0 ].name).toBe(data.items[ 0 ].name);
    expect(ins.items[ 1 ].name).toBe(data.items[ 1 ].name);
  });

  it('.fromApi() should process invalid values', () => {
    const ins = CollectionModel.fromApi({} /* empty data */, TestModel, 5);

    expect(ins.totalItems).toBeUndefined();
    expect(ins.totalPages).toBeUndefined();
    expect(ins.currentPage).toBe(5);
    expect(ins.items instanceof Array).toBeTruthy();
    expect(ins.items.length).toBe(0);
  });

  it('.hasPrevPage, .prevPage, .hasNextPage, .nextPage should works correctly', () => {
    let ins: CollectionModel<any>;

    ins = new CollectionModel({ currentPage: 1, totalPages: 3 } as CollectionModel<any>);
    expect(ins.hasNextPage).toBeTruthy();
    expect(ins.nextPage).toBe(2);
    expect(ins.hasPrevPage).toBeFalsy();
    expect(ins.prevPage).toBeUndefined();

    ins = new CollectionModel({ currentPage: 3, totalPages: 3 } as CollectionModel<any>);
    expect(ins.hasPrevPage).toBeTruthy();
    expect(ins.prevPage).toBe(2);
    expect(ins.hasNextPage).toBeFalsy();
    expect(ins.nextPage).toBeUndefined();

    ins = new CollectionModel({ currentPage: 2, totalPages: 3 } as CollectionModel<any>);
    expect(ins.hasPrevPage).toBeTruthy();
    expect(ins.prevPage).toBe(1);
    expect(ins.hasNextPage).toBeTruthy();
    expect(ins.nextPage).toBe(3);

    ins = new CollectionModel({ currentPage: 1, totalPages: 0 } as CollectionModel<any>);
    expect(ins.hasPrevPage).toBeFalsy();
    expect(ins.prevPage).toBeUndefined();
    expect(ins.hasNextPage).toBeFalsy();
    expect(ins.nextPage).toBeUndefined();
  });

});
