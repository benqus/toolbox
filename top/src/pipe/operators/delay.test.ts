import { createNextFn } from '../../__mocks__/nextFn';
import { delay } from './delay';

jest.useFakeTimers();

describe('delay', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const fn = delay(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('delays execution by x milliseconds', () => {
    const mockNextFn = createNextFn();
    const fn = delay(1000);

    fn(mockNextFn, 1, 2, 3);
    expect(mockNextFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(mockNextFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    
    expect(mockNextFn).toHaveBeenCalledTimes(1);
    expect(mockNextFn).toHaveBeenNthCalledWith(1, 1, 2, 3);
  });
});
