import { ISubscribable } from '../common/types';
import { observable } from './observable';

interface TestObservable {
  a: number;
  b: string;
}

describe('observable', () => {
  let mockTopic: jest.Mock & ISubscribable<[TestObservable]>;

  beforeEach(() => {
    const subscribe = jest.fn();
    mockTopic = Object.assign(jest.fn(), { subscribe });
  });

  test('create sealed object with custom topic', () => {
    const props = {
      a: 5,
      b: 'hakuna',
    };
    const obs = observable(props, mockTopic);

    expect(obs).toEqual(props);
    expect(obs === props).toBe(false);
    expect(obs.subscribe).toEqual(mockTopic.subscribe);
  });

  test('update observable calls topic', () => {
    const props = {
      a: 5,
      b: 'hakuna',
    };
    const obs = observable(props, mockTopic);

    obs.b = 'matata';

    expect(obs.b).toEqual('matata');
    expect(mockTopic).toHaveBeenCalledTimes(1);
    expect(mockTopic).toHaveBeenCalledWith(obs);
  });

  test('update observable calls default topic', () => {
    const props = {
      a: 5,
      b: 'hakuna',
    };
    const subscriber = jest.fn();
    const obs = observable(props);
    obs.subscribe(subscriber);

    obs.b = 'matata';

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(obs);
  });

  test('nested observable subscriptions', () => {
    const subscriber = jest.fn();
    const parent = observable({
      a: 5,
      b: 'b',
      child: observable({
        c: 'hakuna'
      }),
    });
    parent.subscribe(subscriber);

    expect(parent).toEqual({
      a: 5,
      b: 'b',
      child: {
        c: 'hakuna'
      },
    });

    parent.child.c = 'matata';

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(parent);
    expect(parent.child.c).toEqual('matata');
  });

  test('nested observable resubscription', () => {
    const subscriber = jest.fn();
    const parent = observable({
      a: 5,
      b: 'b',
      child: observable({
        c: 'hakuna'
      }),
    });
    parent.child = observable({
      c: 'mat...'
    });
    parent.subscribe(subscriber);

    parent.child.c = 'matata';

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(parent);
    expect(parent.child.c).toEqual('matata');
  });

  test('observable is sealed, new property assignment throws error', () => {
    const props = {
      a: 5,
      b: 'hakuna',
    };
    const obs = observable(props, mockTopic);

    expect(() => {
      // @ts-ignore intentional TS error
      obs.c = 'matata';
    }).toThrowError();

    expect(() => {
      // @ts-ignore override existing property
      obs.subscribe = () => {};
    }).toThrowError();
  });
});
