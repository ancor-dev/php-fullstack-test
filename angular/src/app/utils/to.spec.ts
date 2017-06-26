import { To } from './to';

describe('To helper class', () => {

  it('To.number() should returns number type', () => {
    expect(To.number(123)).toBe(123);
    expect(To.number('123')).toBe(123);
    expect(To.number('a123')).toBe(undefined);
    expect(To.number(null)).toBe(undefined);
  });

  it('To.string() should returns string type', () => {
    expect(To.string('123')).toBe('123');
    expect(To.string('')).toBe('');
    expect(To.string(123)).toBe('123');
    expect(To.string(true)).toBe('true');
    expect(To.string(null)).toBe(undefined);
  });

  it('To.boolean() should returns boolean type', () => {
    expect(To.boolean('123')).toBe(true);
    expect(To.boolean('')).toBe(false);
    expect(To.boolean(true)).toBe(true);
    expect(To.boolean(false)).toBe(false);
    expect(To.boolean(null)).toBe(undefined);
  });

  it('To.object() should returns passed argument only if it instance of Object', () => {
    const obj = {};
    const arr = [];
    expect(To.object(obj)).toBe(obj);
    expect(To.object(arr)).toBe(arr);
    expect(To.object(123)).toBe(undefined);
    expect(To.object(null)).toBe(undefined);
  });

  it('To.array() should returns passed argument only if it instance of Array', () => {
    const arr = [];
    expect(To.array(arr)).toBe(arr);
    expect(To.array({})).toBe(undefined);
    expect(To.array(123)).toBe(undefined);
    expect(To.array(null)).toBe(undefined);
  });

  it(`To.empty()`, () => {
    expect(To.empty(undefined, undefined, () => 1)).toBe(undefined);
    expect(To.empty(null, undefined, () => 1)).toBe(undefined);
    expect(To.empty(123, true, () => 1)).toBe(undefined);
    expect(To.empty(123, false, (raw) => raw * 2)).toBe(246);
  });

});
