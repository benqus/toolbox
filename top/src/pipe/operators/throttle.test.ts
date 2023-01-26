import { createNextFn } from '../../__mocks__/nextFn';
import { throttle } from './throttle';

jest.useFakeTimers();

describe('throttle', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const s = throttle(100);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('throttle calls', () => {
    const mockNextFn1 = createNextFn();
    const mockNextFn2 = createNextFn();
    const mockNextFn3 = createNextFn();
    const mockNextFn4 = createNextFn();
    const d = throttle(50);

    d(mockNextFn1, 1);
    d(mockNextFn2, 2);

    jest.advanceTimersByTime(50);

    d(mockNextFn3, 3);
    d(mockNextFn4, 4);

    jest.advanceTimersByTime(50);

    expect(mockNextFn1).not.toHaveBeenCalled();
    expect(mockNextFn2).toHaveBeenCalledTimes(1);
    expect(mockNextFn2).toHaveBeenCalledWith(2);

    expect(mockNextFn3).not.toHaveBeenCalled();
    expect(mockNextFn4).toHaveBeenCalledTimes(1);
    expect(mockNextFn4).toHaveBeenCalledWith(4);
  });
  
});
