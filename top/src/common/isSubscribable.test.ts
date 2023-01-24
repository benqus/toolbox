import { isSubscribable } from './isSubscribable';

describe('isSubscribable', () => {
  test('is it', () => {
    expect(isSubscribable('bla')).toBe(false);
    expect(isSubscribable(10)).toBe(false);
    expect(isSubscribable(null)).toBe(false);
    expect(isSubscribable(void 0)).toBe(false);
    expect(isSubscribable({})).toBe(false);
    expect(isSubscribable({ subscribe() {} })).toBe(true);
  });
});
