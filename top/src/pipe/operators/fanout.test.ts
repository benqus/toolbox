import { createNextFn } from '../../__mocks__/nextFn';
import { fanout } from './fanout';

describe('fanout', () => {
  test('fn', () => {
    const s = fanout();

    expect(s).toEqual(expect.any(Function));
  });
  
  test('invoke', () => {
    const mockNextFn = createNextFn();
    const exec1 = jest.fn();
    const exec2 = jest.fn();
    const exec3 = jest.fn();
    const s = fanout(
      exec1,
      exec2,
      exec3,
    );

    s(mockNextFn, 1, 2, 3);

    expect(mockNextFn).toHaveBeenCalledTimes(1);
    expect(mockNextFn).toHaveBeenCalledWith(1, 2, 3);
    
    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1).toHaveBeenCalledWith(1, 2, 3);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(1, 2, 3);
    expect(exec3).toHaveBeenCalledTimes(1);
    expect(exec3).toHaveBeenCalledWith(1, 2, 3);
  });
});
