import { createMockExecutionOptions } from '../__mocks__/executionOptions';
import { reduce } from './reduce';

describe('transform', () => {
  test('fn', () => {
    const s = reduce(() => ({}));

    expect(s).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const optionsMock = createMockExecutionOptions();
    const output = [1, 2, 3];
    const s = reduce(() => output);

    s(optionsMock);

    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenCalledWith(output);
  });
});
