import { isPromise } from '../src/isPromise';

describe('isPromise', () => {
  const its: Array<[ string, any, boolean ]> = [
    ['returns true for Promise instance', new Promise(() => {}), true],
    ['returns true for async function', (async function () {})(), true],
    ['returns true for thenable', { then() {} }, true],
    ['returns false for non-thenable object', {}, false],
    ['returns false for array',  [], false],
    ['returns false for function', function () {}, false],
    ['returns false for null', null, false],
    ['returns false for undefined', undefined, false],
    ['returns false for string', '', false],
    ['returns false for number', 0, false],
  ];

  its.forEach(([ label, value, expected ]) => {
    it(label, () => {
      expect(isPromise(value)).toBe(expected);
    });
  });
});
