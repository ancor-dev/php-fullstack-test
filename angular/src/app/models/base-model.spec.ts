import { BaseModel } from './base-model';

class Test extends BaseModel<Test> {

  public field1: string;
  public field2: number;

  public constructor(data: Test = {} as Test) {
    super();

    const fields: Array<keyof Test> = [
      'field1',
      'field2',
    ];

    this.fillAll(data, fields);
  }
}

const data = <Test> {
  field1: 'string',
  field2: 123,
};

describe('BaseModel class', () => {

  it('Method .fill()', () => {
    const ins = new Test(data);
    expect(ins).toEqual(jasmine.objectContaining(data));
  });

  it('Method .clone()', () => {
    const ins   = new Test(data);
    const clone = ins.clone({ field2: 234 });

    expect(ins).not.toBe(clone);
    expect(ins.field1).toBe(clone.field1);
    expect(clone.field2).toBe(234);
  });

});
