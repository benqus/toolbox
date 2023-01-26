import { createNextFn } from '../../__mocks__/nextFn';
import { filter } from './filter';

describe('filter', () => {
  test('fn', () => {
    const s = filter(() => true);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('calls next when true is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => true);

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).toHaveBeenCalledTimes(1);
    expect(mockNextFn).toHaveBeenCalledWith(1, 2, 3);
  });
  
  test('calls next when undefined is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => undefined);

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).toHaveBeenCalledTimes(1);
    expect(mockNextFn).toHaveBeenCalledWith(1, 2, 3);
  });
  
  test('does not call next when null is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => null);

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).not.toHaveBeenCalled();
  });
  
  test('does not call next when false is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => false);

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).not.toHaveBeenCalled();
  });
  
  test('does not call next when zero is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => 0);

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).not.toHaveBeenCalled();
  });
  
  test('does not call next when empty string is returned', () => {
    const mockNextFn = createNextFn();
    const s = filter(() => '');

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).not.toHaveBeenCalled();
  });
});
