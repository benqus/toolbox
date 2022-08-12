import { stop, Stop } from './stop';

describe('stop', () => {
  test('Stop', () => {
    expect(Stop).toHaveProperty('stop');
    expect(Stop.stop).toEqual(true);
  });

  test('stop', () => {
    expect(stop()).toEqual(Stop);
  });
});
