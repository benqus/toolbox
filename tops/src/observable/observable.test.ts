import { IEmitter } from '../common';
import { observable } from './observable';

describe('observable', () => {
  let mockTopic: jest.Mock & IEmitter;

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

  test('update observable calls custom topic', () => {
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
