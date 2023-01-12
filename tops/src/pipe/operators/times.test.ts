import { createMockPipeController } from '../../__mocks__/pipeController';
import { times } from './times';

describe('times', () => {
  test('fn', () => {
    const fn = times(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('triggers next x times with same arguments', () => {
    const optionsMock1 = createMockPipeController();
    const optionsMock2 = createMockPipeController();
    const fn = times(3);

    fn(optionsMock1, 1, 2, 3);
    fn(optionsMock2, 1, 2, 3);

    expect(optionsMock1.next).toHaveBeenCalledTimes(3);
    expect(optionsMock1.next).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(optionsMock1.next).toHaveBeenNthCalledWith(2, 1, 2, 3);
    expect(optionsMock1.next).toHaveBeenNthCalledWith(3, 1, 2, 3);

    expect(optionsMock2.next).toHaveBeenCalledTimes(3);
    expect(optionsMock2.next).toHaveBeenNthCalledWith(1, 1, 2, 3);
    expect(optionsMock2.next).toHaveBeenNthCalledWith(2, 1, 2, 3);
    expect(optionsMock2.next).toHaveBeenNthCalledWith(3, 1, 2, 3);
  });
});
