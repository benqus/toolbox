import { debounce as debounceTopic } from './debounce';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('topic - debounce', () => {
  test('fn', () => {
    const t = debounceTopic();

    expect(t).toEqual(expect.any(Function));
    expect(t.subscribe).toEqual(expect.any(Function));
  });

  test('subscribe returns an unsubscribe function', () => {
    const t = debounceTopic<[ string ]>();

    const subscriber = jest.fn();
    const unsubscribe = t.subscribe(subscriber);

    expect(typeof unsubscribe).toEqual('function');
  });

  test('publish to topic with default publisher invokes all subscribers with all arguments', () => {
    const t = debounceTopic<[ string, number ]>();

    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    t.subscribe(subscriber1);
    t.subscribe(subscriber2);

    t('hakuna matata', 5);

    jest.advanceTimersByTime(1);

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber1).toHaveBeenCalledWith('hakuna matata', 5);
    expect(subscriber2).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledWith('hakuna matata', 5);
  });

  test('unsubscribe', () => {
    const t = debounceTopic<[ string ]>();

    const subscriber = jest.fn();
    const unsubscribe = t.subscribe(subscriber);
    unsubscribe();

    t('hakuna matata');

    jest.advanceTimersByTime(1);

    expect(subscriber).not.toHaveBeenCalled();
  });

  
  test('debounce - default timeout', () => {
    const subscriber1 = jest.fn();
    const t = debounceTopic<[ string, number ]>();
    t.subscribe(subscriber1);

    t('hakuna matata1', 1);
    t('hakuna matata2', 2);
    t('hakuna matata3', 3);
    t('hakuna matata4', 4);
    t('hakuna matata5', 5);

    expect(subscriber1).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber1).toHaveBeenLastCalledWith('hakuna matata5', 5);

    t('hakuna matata1', 6);
    t('hakuna matata2', 7);
    t('hakuna matata3', 8);
    t('hakuna matata4', 9);
    t('hakuna matata10', 10);

    jest.advanceTimersByTime(1);

    expect(subscriber1).toHaveBeenCalledTimes(2);
    expect(subscriber1).toHaveBeenLastCalledWith('hakuna matata10', 10);
  });

  test('debounce - custom timeout', () => {
    const subscriber1 = jest.fn();
    const t = debounceTopic<[ string, number ]>(10);
    t.subscribe(subscriber1);

    t('hakuna matata1', 1);
    t('hakuna matata2', 2);
    t('hakuna matata3', 3);
    t('hakuna matata4', 4);
    t('hakuna matata5', 5);

    jest.advanceTimersByTime(5);

    expect(subscriber1).not.toHaveBeenCalled();

    t('hakuna matata1', 6);
    t('hakuna matata2', 7);
    t('hakuna matata3', 8);
    t('hakuna matata4', 9);
    t('hakuna matata10', 10);

    jest.advanceTimersByTime(15);

    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber1).toHaveBeenLastCalledWith('hakuna matata10', 10);
  });
});
