export abstract class BaseModel<M> {

  /**
   * Clone model object and apply patch if it need
   */
  public clone(patch?: object): M {
    const Constructor: { new(M): M } = <any> this.constructor;

    const clone: M = new Constructor(this);

    Object.assign(clone, patch);

    return clone;
  } // end clone()

  /**
   * Take 'field' from 'raw' object and if in not equal to 'undefined' set it to 'this' object
   */
  protected fill<T extends keyof M>(raw: object, field: T, rawField?: string): void {
    const model: M = <any> this;
    const sourceField = rawField !== undefined ? rawField : field;

    model[ field ] = raw[ sourceField ] === undefined
      ? null
      : ( // make copy of the object if it an array or a BaseModel instance
          raw[ sourceField ] instanceof Array     ? (raw[ sourceField ] as Array<any>).concat()    :
          raw[ sourceField ] instanceof BaseModel ? (raw[ sourceField ] as BaseModel<any>).clone() :
          raw[ sourceField ]
        );
  }

  /**
   * Calls {@link BaseModel.fill()} to an array of fields
   */
  protected fillAll(data: object, fields: Array<keyof M>): void {
    fields.forEach((field) => this.fill(data, field));
  }

} // end BaseModel
