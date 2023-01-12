import { createMockPipeController } from '../../__mocks__/pipeController';
import { throttle } from './throttle';

jest.useFakeTimers();

describe('throttle', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('fn', () => {
    const s = throttle(100);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('throttle calls', () => {
    const optionsMock1 = createMockPipeController();
    const optionsMock2 = createMockPipeController();
    const optionsMock3 = createMockPipeController();
    const optionsMock4 = createMockPipeController();
    const d = throttle(50);

    d(optionsMock1, 1);
    d(optionsMock2, 2);

    jest.advanceTimersByTime(50);

    d(optionsMock3, 3);
    d(optionsMock4, 4);

    jest.advanceTimersByTime(50);

    expect(optionsMock1.next).not.toHaveBeenCalled();
    expect(optionsMock2.next).toHaveBeenCalledTimes(1);
    expect(optionsMock2.next).toHaveBeenCalledWith(2);

    expect(optionsMock3.next).not.toHaveBeenCalled();
    expect(optionsMock4.next).toHaveBeenCalledTimes(1);
    expect(optionsMock4.next).toHaveBeenCalledWith(4);
  });
  
});
