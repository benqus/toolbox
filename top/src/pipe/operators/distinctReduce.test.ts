import { createMockPipeController } from '../../__mocks__/pipeController';
import { distinctReduce } from './distinctReduce';

describe('distinctReduce', () => {
  test('fn', () => {
    const s = distinctReduce(() => ({}));

    expect(s).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const optionsMock = createMockPipeController();
    const s = distinctReduce((n, m) => n + m);

    s(optionsMock, 1, 2);
    s(optionsMock, 3, 4);
    s(optionsMock, 3, 4);

    expect(optionsMock.next).toHaveBeenCalledTimes(2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, 1, 2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(2, 3, 4);
  });
});
