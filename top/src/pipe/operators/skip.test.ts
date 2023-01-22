import { createMockPipeController } from '../../__mocks__/pipeController';
import { skip } from './skip';

describe('skip', () => {
  test('fn', () => {
    const fn = skip(1);

    expect(fn).toEqual(expect.any(Function));
  });
  
  test('skips x calls then executes', () => {
    const optionsMock = createMockPipeController();
    const fn = skip(4);

    fn(optionsMock, 1, 2, 3);
    fn(optionsMock, 2, 3, 4);
    fn(optionsMock, 3, 4, 5);
    fn(optionsMock, 4, 5, 6);
    fn(optionsMock, 5, 6, 7);
    fn(optionsMock, 6, 7, 8);

    expect(optionsMock.next).toHaveBeenCalledTimes(2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, 5, 6, 7);
    expect(optionsMock.next).toHaveBeenNthCalledWith(2, 6, 7, 8);
  });
});
