import { topic } from './topic';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('topic', () => {
  test('fn', () => {
    const t = topic();

    expect(t).toEqual(expect.any(Function));
    expect(t.subscribe).toEqual(expect.any(Function));
  });

  test('subscribe returns an unsubscribe function', () => {
    const t = topic<[ string ]>();

    const subscriber = jest.fn();
    const unsubscribe = t.subscribe(subscriber);

    expect(typeof unsubscribe).toEqual('function');
  });

  test('publish to topic invokes custom executor with default behaviour', () => {
    const executor = jest.fn();
    const t = topic<[ string, number ]>(executor);

    t('hakuna matata', 5)

    expect(executor).toHaveBeenCalledTimes(1);
    expect(executor).toHaveBeenCalledWith([expect.any(Function)]);
  });

  test('publish to topic with default executor invokes all subscribers with all arguments', () => {
    const t = topic<[ string, number ]>();

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    t.subscribe(subscriber1);
    t.subscribe(subscriber2);

    t('hakuna matata', 5);

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber1).toHaveBeenCalledWith(['hakuna matata', 5]);
    expect(subscriber2).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledWith(['hakuna matata', 5]);
  });

  test('unsubscribe', () => {
    const t = topic<[ string ]>();

    const subscriber = jest.fn();
    const unsubscribe = t.subscribe(subscriber);
    unsubscribe();

    t('hakuna matata');

    expect(subscriber).not.toHaveBeenCalled();
  });

  test('throttle', () => {
    const t = topic.throttle<[ string, number ]>();

    const subscriber1 = jest.fn();
    t.subscribe(subscriber1);

    t('hakuna matata1', 5);
    t('hakuna matata2', 6);
    t('hakuna matata3', 7);
    t('hakuna matata4', 8);
    t('hakuna matata5', 9);

    jest.advanceTimersToNextTimer();

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber1).toHaveBeenCalledWith(['hakuna matata5', 9]);
  });
});
