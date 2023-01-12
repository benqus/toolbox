import { topic } from './topic';
import { Fn } from '../common';

describe('topic', () => {
  test('fn', () => {
    const t = topic();

    expect(t).toEqual(expect.any(Function));
    expect(t.listen).toEqual(expect.any(Function));
    expect(t.kill).toEqual(expect.any(Function));
  });

  test('listen', () => {
    const subs: Set<Fn> = new Set();
    const t = topic(subs);

    const listener = jest.fn();
    const leave = t.listen(listener);

    expect(subs.has(listener)).toBe(true);
    expect(typeof leave).toEqual('function');
  });

  test('leave', () => {
    const subs: Set<Fn> = new Set();
    const t = topic(subs);

    const listener = jest.fn();
    const leave = t.listen(listener);
    leave();

    expect(subs.has(listener)).toBe(false);
  });

  test('kill', () => {
    const listener = jest.fn();
    const subs: Set<Fn> = new Set([ listener ]);
    const t = topic(subs);

    t.kill();

    expect(subs.has(listener)).toBe(false);
  });

  test('invoke', () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const listener3 = jest.fn();

    const subs: Set<Fn> = new Set([listener1, listener2, listener3]);
    const t = topic(subs);

    t(1, 2, 3);

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener1).toHaveBeenCalledWith(1, 2, 3);
    expect(listener2).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledWith(1, 2, 3);
    expect(listener3).toHaveBeenCalledTimes(1);
    expect(listener3).toHaveBeenCalledWith(1, 2, 3);
  });
});
