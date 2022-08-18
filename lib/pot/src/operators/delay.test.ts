import { createMockExecutionOptions } from '../__mocks__/executionOptions';
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
    const optionsMock = createMockExecutionOptions();
    const fn = delay(1000);

    fn(optionsMock, 1, 2, 3);
    expect(optionsMock.next).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(optionsMock.next).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    
    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, 1, 2, 3);
  });
});
