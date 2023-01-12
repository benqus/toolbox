import { observable } from './observable';

describe('observable', () => {
  test('create', () => {
    const o = observable(5);

    expect(o).toEqual(expect.any(Function));
    expect(o.listen).toEqual(expect.any(Function));
    expect(o.kill).toEqual(expect.any(Function));
    expect(o.latest).toEqual(expect.any(Function));
  });

  test('latest', () => {
    const o = observable(5);

    expect(o.latest()).toEqual(5);

    o(6);

    expect(o.latest()).toEqual(6);
  });

  test('update', () => {
    const o = observable(5);

    o(6);

    expect(o.latest()).toEqual(6);
  });

  test('listen', () => {
    const o = observable(5);
    const subscriber = jest.fn();

    o.listen(subscriber);
    o(6);
    o(6);

    expect(subscriber).toHaveBeenCalledTimes(1);
    // called with newValue & oldValue
    expect(subscriber).toHaveBeenLastCalledWith(6, 5);
  });

  test('kill', () => {
    const o = observable(5);
    const listener = jest.fn();

    o.listen(listener);
    o(6);
    o.kill();
    o(7);

    expect(listener).toHaveBeenCalledTimes(1);
    // called with newValue & oldValue
    expect(listener).toHaveBeenCalledWith(6, 5);
  });

});
