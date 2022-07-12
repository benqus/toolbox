import { Emitter } from '../src/Emitter';

describe('Emitter', () => {
  it('subscribe', () => {
    const subscriberSpy = jest.fn();
    const emitter = new Emitter();
    
    emitter.subscribe(subscriberSpy);

    //@ts-ignore
    expect(emitter._l.has(subscriberSpy)).toBe(true);
  });

  it('unsubscribe', () => {
    const subscriberSpy = jest.fn();
    const emitter = new Emitter();
    
    emitter.subscribe(subscriberSpy);
    emitter.unsubscribe(subscriberSpy);

    //@ts-ignore
    expect(emitter._l.has(subscriberSpy)).toBe(false);
  });

  it('emit', () => {
    const subscriberSpy1 = jest.fn();
    const subscriberSpy2 = jest.fn();
    const emitter = new Emitter<[ number, number ]>();
    
    emitter.subscribe(subscriberSpy1, subscriberSpy2);
    emitter.emit(1, 2);

    expect(subscriberSpy1).toHaveBeenCalledWith(1, 2);
    expect(subscriberSpy2).toHaveBeenCalledWith(1, 2);
  });

  it('clear', () => {
    const subscriberSpy1 = jest.fn();
    const subscriberSpy2 = jest.fn();
    const emitter = new Emitter<[ number, number ]>();
    
    emitter.subscribe(subscriberSpy1, subscriberSpy2);
    emitter.clear();

    //@ts-ignore
    expect(emitter._l.has(subscriberSpy1)).toBe(false);
    //@ts-ignore
    expect(emitter._l.has(subscriberSpy2)).toBe(false);
  });
});
