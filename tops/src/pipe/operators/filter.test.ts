import { createMockPipeController } from '../../__mocks__/pipeController';
import { filter } from './filter';

describe('filter', () => {
  test('fn', () => {
    const s = filter(() => true);

    expect(s).toEqual(expect.any(Function));
  });
  
  test('calls next when true is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => true);

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenCalledWith(1, 2, 3);
  });
  
  test('calls next when undefined is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => undefined);

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenCalledWith(1, 2, 3);
  });
  
  test('does not call next when null is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => null);

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).not.toHaveBeenCalled();
  });
  
  test('does not call next when false is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => false);

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).not.toHaveBeenCalled();
  });
  
  test('does not call next when zero is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => 0);

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).not.toHaveBeenCalled();
  });
  
  test('does not call next when empty string is returned', () => {
    const optionsMock = createMockPipeController();
    const s = filter(() => '');

    s(optionsMock, 1, 2, 3);

    expect(optionsMock.next).not.toHaveBeenCalled();
  });
});
