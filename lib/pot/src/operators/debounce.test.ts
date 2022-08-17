import { createMockExecutionOptions } from '../__mocks__/executionOptions';
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
    const optionsMock1 = createMockExecutionOptions();
    const optionsMock2 = createMockExecutionOptions();
    const optionsMock3 = createMockExecutionOptions();
    const optionsMock4 = createMockExecutionOptions();
    const d = debounce(100);

    d(optionsMock1, 1);
    d(optionsMock2, 2);

    jest.advanceTimersByTime(50);

    d(optionsMock3, 3);
    d(optionsMock4, 4);

    jest.advanceTimersByTime(300);

    expect(optionsMock1.next).not.toHaveBeenCalled();
    expect(optionsMock2.next).not.toHaveBeenCalled();
    expect(optionsMock3.next).not.toHaveBeenCalled();
    expect(optionsMock4.next).toHaveBeenCalledTimes(1);
    expect(optionsMock4.next).toHaveBeenCalledWith(4);
  });
  
});
