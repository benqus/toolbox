import { ISubscribable, ILatest } from '../common/types';
import { observable } from './observable';

interface TestObservable {
  a: number;
  b: string;
}

describe('observable', () => {
  let mockTopic: jest.Mock & ISubscribable<[TestObservable]> & ILatest<[TestObservable]>;

  beforeEach(() => {
    const subscribe = jest.fn();
    const latest = jest.fn();
    mockTopic = Object.assign(jest.fn(), { subscribe, latest });
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

    expect(subscriber).toHaveBeenCalledWith(obs);
  });

  test('observable is sealed, new property assignment throws error', () => {
    const props = {
      a: 5,
      b: 'hakuna',
    };
    const obs = observable(props, mockTopic);

    expect(() => {
      // @ts-ignore intentionally ignore TS error
      obs.c = 'matata';
    }).toThrowError();
  });
});
