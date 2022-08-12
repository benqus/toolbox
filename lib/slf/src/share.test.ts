import { share } from './share';

describe('share', () => {
  test('fn', () => {
    const s = share();

    expect(s).toEqual(expect.any(Function));
  });
  
  test('invoke', () => {
    const exec1 = jest.fn();
    const exec2 = jest.fn();
    const exec3 = jest.fn();
    const s = share(
      exec1,
      exec2,
      exec3,
    );

    s(1, 2, 3);
    
    expect(exec1).toHaveBeenCalledTimes(1);
    expect(exec1).toHaveBeenCalledWith(1, 2, 3);
    expect(exec2).toHaveBeenCalledTimes(1);
    expect(exec2).toHaveBeenCalledWith(1, 2, 3);
    expect(exec3).toHaveBeenCalledTimes(1);
    expect(exec3).toHaveBeenCalledWith(1, 2, 3);
  });
});
