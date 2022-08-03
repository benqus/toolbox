/* eslint-disable @typescript-eslint/no-empty-function */
import { isPromise } from '../src/isPromise';

describe('isPromise', () => {
  test.each([
    [new Promise(() => { }), true],
    [(async function () { })(), true],
    [{ then() { } }, true],
    [{}, false],
    [[], false],
    [function () { }, false],
    [null, false],
    [undefined, false],
    ['', false],
    [0, false],
  ])('%p is %p', (value, expected) => {
    expect(isPromise(value)).toBe(expected);
  });
});
