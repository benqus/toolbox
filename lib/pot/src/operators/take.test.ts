import { createMockExecutionOptions } from '../__mocks__/executionOptions';
import { take } from './take';

describe('take', () => {
  test('fn', () => {
    const fn = take(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('takes only x calls', () => {
    const optionsMock = createMockExecutionOptions();
    const fn = take(4);

    fn(optionsMock, 1, 2, 3);
    fn(optionsMock, 2, 3, 4);
    fn(optionsMock, 3, 4, 5);
    fn(optionsMock, 4, 5, 6);
    fn(optionsMock, 5, 6, 7);
    fn(optionsMock, 6, 7, 8);

    expect(optionsMock.next).toHaveBeenCalledTimes(4);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(optionsMock.next).toHaveBeenNthCalledWith(2, 2, 3, 4);
    expect(optionsMock.next).toHaveBeenNthCalledWith(3, 3, 4, 5);
    expect(optionsMock.next).toHaveBeenNthCalledWith(4, 4, 5, 6);
  });
});
