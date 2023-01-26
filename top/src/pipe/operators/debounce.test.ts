import { createNextFn } from '../../__mocks__/nextFn';
import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const s = debounce(100);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('debounce calls', () => {
    const mockNextFn1 = createNextFn();
    const mockNextFn2 = createNextFn();
    const mockNextFn3 = createNextFn();
    const mockNextFn4 = createNextFn();
    const d = debounce(100);

    d(mockNextFn1, 1);
    d(mockNextFn2, 2);

    jest.advanceTimersByTime(50);

    d(mockNextFn3, 3);
    d(mockNextFn4, 4);

    jest.advanceTimersByTime(300);

    expect(mockNextFn1).not.toHaveBeenCalled();
    expect(mockNextFn2).not.toHaveBeenCalled();
    expect(mockNextFn3).not.toHaveBeenCalled();
    expect(mockNextFn4).toHaveBeenCalledTimes(1);
    expect(mockNextFn4).toHaveBeenCalledWith(4);
  });
  
});
