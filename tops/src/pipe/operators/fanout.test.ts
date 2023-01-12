import { createMockPipeController } from '../../__mocks__/pipeController';
import { fanout } from './fanout';

describe('fanout', () => {
  test('fn', () => {
    const s = fanout();

    expect(s).toEqual(expect.any(Function));
  });
  
  test('invoke', () => {
    const optionsMock = createMockPipeController();
    const exec1 = jest.fn();
    const exec2 = jest.fn();
    const exec3 = jest.fn();
    const s = fanout(
      exec1,
      exec2,
      exec3,
    );

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenCalledWith(1, 2, 3);
    
    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1).toHaveBeenCalledWith(1, 2, 3);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(1, 2, 3);
    expect(exec3).toHaveBeenCalledTimes(1);
    expect(exec3).toHaveBeenCalledWith(1, 2, 3);
  });
});
