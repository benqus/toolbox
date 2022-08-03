import { initializeContext } from '../src/Context';

describe('Context', () => {
  test('creates a Context class', () => {
    const Context = initializeContext();

    expect(Context).toBeInstanceOf(Function);
  });

  test('Context class can be instantiated', () => {
    const Context = initializeContext();
    const value = {};
    const instance = new Context(value);

    expect(instance).toBeInstanceOf(Context);
    expect(instance.value).toEqual(value);
  });

  test('Context value setting invokes subscribers', (done) => {
    const Context = initializeContext();
    const mockSubscriber = jest.fn();
    const value = {};
    const newValue = {};
    const instance = new Context(value);

    Context.subscribe(mockSubscriber);
    instance.value = newValue;

    setTimeout(() => {
      expect(mockSubscriber).toHaveBeenCalled();
      expect(instance.value).toEqual(newValue);
      done();
    }, 1);
  });

  test('Context unsubscribe', (done) => {
    const Context = initializeContext();
    const mockSubscriber = jest.fn();
    const value = {};
    const newValue = {};
    const instance = new Context(value);

    Context.subscribe(mockSubscriber);
    Context.unsubscribe(mockSubscriber);
    instance.value = newValue;

    setTimeout(() => {
      expect(mockSubscriber).not.toHaveBeenCalled();
      done();
    }, 1);
  });

  test('different intializeContexts update separately', (done) => {
    const Context1 = initializeContext();
    const Context2 = initializeContext();
    const mockSubscriber1 = jest.fn();
    const mockSubscriber2 = jest.fn();
    const value = {};
    const newValue = {};
    const instance = new Context1(value);

    Context1.subscribe(mockSubscriber1);
    Context2.subscribe(mockSubscriber2);
    instance.value = newValue;

    setTimeout(() => {
      expect(mockSubscriber1).toHaveBeenCalled();
      expect(mockSubscriber2).not.toHaveBeenCalled();
      done();
    }, 1);
  });
});
