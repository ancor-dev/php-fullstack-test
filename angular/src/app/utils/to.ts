/**
 * This is helper class for parse server response
 * @todo: default values
 */
export class To {

  public static number(raw: any): number {
    const n = Number(raw);
    return this.empty(raw, isNaN(n), () => n);
  }

  public static boolean(raw: any): boolean {
    return this.empty(raw, undefined, () => Boolean(Number(raw)));
  }

  public static string(raw: any): string {
    return this.empty(raw, undefined, () => String(raw));
  }

  public static object(raw: any): object {
    return this.empty(raw, raw instanceof Object === false, () => raw);
  }

  public static array<T extends any>(raw: any): Array<T> {
    return this.empty(raw, raw instanceof Array === false, raw);
  }

  /**
   * Returns undefined if 'raw' argument is undefined or null or also if emptyCondition is falsely.
   * Returns result of 'cb' function execution otherwise
   */
  public static empty<T, R>(raw: R, emptyCondition: boolean, cb: (raw: R) => T): T | R {
    return raw === undefined || raw === null || emptyCondition
      ? undefined
      : (cb instanceof Function ? cb(raw) : raw);
  }

}
