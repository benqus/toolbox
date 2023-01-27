import { Fn, Unsubscriber } from '../common/types';
import { handleSubscribable } from './handleSubscribable';

describe('handleSubscribable', () => {
  let mockPublish: Fn;
  let mockUnsubscriber: Fn;
  let mockUnsubscribes: Map<string, Unsubscriber>;

  beforeEach(() => {
    mockPublish = jest.fn();
    mockUnsubscriber = jest.fn();
    mockUnsubscribes = new Map();
  });

  test('returns value', () => {
    const value = [];
    const result = handleSubscribable('a', value, mockPublish, mockUnsubscribes);

    expect(result === value).toBe(true);
  });

  test('unsubscribes and resubscribes', () => {
    const subscribable = {
      subscribe: jest.fn(() => mockUnsubscriber),
    };
    mockUnsubscribes.set('a', () => false);
    
    handleSubscribable('a', subscribable, mockPublish, mockUnsubscribes);

    expect(subscribable.subscribe).toHaveBeenCalledTimes(1);
    expect(subscribable.subscribe).toHaveBeenCalledWith(mockPublish);
    expect(mockUnsubscribes.get('a')).toEqual(mockUnsubscriber);
  });
});
