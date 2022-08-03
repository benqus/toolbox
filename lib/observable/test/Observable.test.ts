/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Observable } from '../src/Observable';

describe('Observable', () => {
  test('subscribe', () => {
    const subscriberSpy = jest.fn();
    const observable = new Observable();
    
    observable.subscribe(subscriberSpy);

    //@ts-ignore
    expect(observable._l.has(subscriberSpy)).toBe(true);
  });

  test('unsubscribe', () => {
    const subscriberSpy = jest.fn();
    const observable = new Observable();
    
    observable.subscribe(subscriberSpy);
    observable.unsubscribe(subscriberSpy);

    //@ts-ignore
    expect(observable._l.has(subscriberSpy)).toBe(false);
  });

  test('emit via value', () => {
    const subscriberSpy1 = jest.fn();
    const subscriberSpy2 = jest.fn();
    const observable = new Observable<[ number, number ]>();
    
    observable.subscribe(subscriberSpy1, subscriberSpy2);
    observable.value = [1, 2];

    expect(subscriberSpy1).toHaveBeenCalledWith([ 1, 2 ], observable);
    expect(subscriberSpy2).toHaveBeenCalledWith([ 1, 2 ], observable);
  });

  test('clear', () => {
    const subscriberSpy1 = jest.fn();
    const subscriberSpy2 = jest.fn();
    const observable = new Observable<[ number, number ]>();
    
    observable.subscribe(subscriberSpy1, subscriberSpy2);
    observable.clear();

    //@ts-ignore
    expect(observable._l.has(subscriberSpy1)).toBe(false);
    //@ts-ignore
    expect(observable._l.has(subscriberSpy2)).toBe(false);
  });
});
