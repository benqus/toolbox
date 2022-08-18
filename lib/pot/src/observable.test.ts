import { observable } from './observable';

describe('observable', () => {
  test('create', () => {
    const o = observable(5);

    expect(o).toEqual(expect.any(Function));
    expect(o.topic).toEqual(expect.any(Function));
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

  test('subscribe', () => {
    const o = observable(5);
    const subscriber = jest.fn();

    o.topic.subscribe(subscriber);
    o(6);
    o(6);

    expect(subscriber).toHaveBeenCalledTimes(1);
    // called with newValue & oldValue
    expect(subscriber).toHaveBeenLastCalledWith(6, 5);
  });

  test('unsubscribe', () => {
    const o = observable(5);
    const subscriber = jest.fn();

    o.topic.subscribe(subscriber);
    o(6);
    o.topic.unsubscribe(subscriber);
    o(7);

    expect(subscriber).toHaveBeenCalledTimes(1);
    // called with newValue & oldValue
    expect(subscriber).toHaveBeenCalledWith(6, 5);
  });

});
