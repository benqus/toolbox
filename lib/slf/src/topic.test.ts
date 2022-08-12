import { topic } from './topic';
import { FnArgs, IFn } from './types';

describe('topic', () => {
  test('fn', () => {
    const t = topic();

    expect(t).toEqual(expect.any(Function));
    expect(t.$subscribe).toEqual(expect.any(Function));
    expect(t.$unsubscribe).toEqual(expect.any(Function));
  });

  test('$subscribe', () => {
    const subs: Set<IFn<FnArgs, unknown>> = new Set();
    const t = topic(subs);

    const listener = () => null;
    const r = t.$subscribe(listener);

    expect(subs.has(listener)).toBe(true);
    expect(r).toEqual(t);
  });

  test('$unsubscribe', () => {
    const subs: Set<IFn<FnArgs, unknown>> = new Set();
    const t = topic(subs);

    const listener = () => null;
    subs.add(listener);
    const r = t.$unsubscribe(listener);

    expect(subs.has(listener)).toBe(false);
    expect(r).toEqual(t);
  });

  test('invoke', () => {
    const subs: Set<IFn<FnArgs, unknown>> = new Set();
    const t = topic(subs);

    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const listener3 = jest.fn();
    subs.add(listener1);
    subs.add(listener2);
    subs.add(listener3);

    const r = t(1, 2, 3);

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener1).toHaveBeenCalledWith(1, 2, 3);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledWith(1, 2, 3);
    expect(listener3).toHaveBeenCalledTimes(1);
    expect(listener3).toHaveBeenCalledWith(1, 2, 3);
    expect(r).toEqual(t);
  });
});