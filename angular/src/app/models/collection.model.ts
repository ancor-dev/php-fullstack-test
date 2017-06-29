import { BaseModel } from './base-model';
import { To } from '../utils/to';

export class CollectionModel<M> extends BaseModel<CollectionModel<M>> {

  public totalItems: number;

  public totalPages: number;
  public currentPage: number;

  public items: Array<M>;

  public get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  public get hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  public get nextPage(): number {
    return this.hasNextPage ? this.currentPage + 1 : undefined;
  }

  public get prevPage(): number {
    return this.hasPrevPage ? this.currentPage - 1 : undefined;
  }

  public constructor(data: CollectionModel<M> = {} as CollectionModel<M>) {
    super();

    const fields: Array<keyof CollectionModel<M>> = [
      'totalPages',
      'totalItems',

      'currentPage',
      'items',
    ];

    this.fillAll(data, fields);
  } // end constructor()

  public static fromApi<M>(
    data: object,
    ModelConstructor: { new (data: M): M; fromApi(data: object): M; },
    currentPage?: number,
  ): CollectionModel<M> {
    console.assert(data instanceof Object, 'CollectionModel.fromApi(). Data should an object');

    const mapped = <CollectionModel<M>> {
      totalItems: To.number(data[ 'total_items' ]),

      totalPages: To.number(data[ 'total_pages' ]),
      currentPage: currentPage === undefined ? 1 : currentPage,

      items: data[ 'items' ] instanceof Array
               ? (ModelConstructor.fromApi instanceof Function
                 ? data[ 'items' ].map((one) => ModelConstructor.fromApi(one))
                 : data[ 'items' ])
               : [],
    };

    return new this(mapped);
  } // end fromApi()

}
