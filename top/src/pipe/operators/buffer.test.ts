import { createMockPipeController } from '../../__mocks__/pipeController';
import { buffer } from './buffer';

describe('buffer', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const s = buffer(100);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('buffer', () => {
    const optionsMock = createMockPipeController();
    const d = buffer(4);

    d(optionsMock, 1, 2);
    d(optionsMock, 3, 4);
    d(optionsMock, 5, 6);
    d(optionsMock, 7, 8);

    d(optionsMock, 10, 11);
    d(optionsMock, 12, 13);
    d(optionsMock, 14, 15);
    d(optionsMock, 16, 17);

    expect(optionsMock.next).toHaveBeenCalledTimes(2);
    expect(optionsMock.next).toHaveBeenNthCalledWith(1, [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
    expect(optionsMock.next).toHaveBeenNthCalledWith(2, [
      [10, 11],
      [12, 13],
      [14, 15],
      [16, 17],
    ]);
  });
  
});
