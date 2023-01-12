import { getFnLatest } from './getFnLatest';

describe('getPipeLatest', () => {
  test('invokes function', () => {
    const fn = jest.fn().mockReturnValue(5);

    const result = getFnLatest(fn);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(5);
  });

  test('invokes latest', () => {
    const fn = () => ({});
    fn.latest = jest.fn().mockReturnValue(5);

    const result = getFnLatest(fn);

    expect(fn.latest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(5);
  });

});

