import { buildNextFnForTargetable } from '../../src/utils/buildNextFnForTargetable';

describe('buildNextFnForTargetable', () => {
  const exec = jest.fn();
  const target = { exec };

  test('returns a function with the correct default properties', () => {
    const nextFn = buildNextFnForTargetable({ target });

    expect(nextFn).toBeInstanceOf(Function);
    expect(nextFn.hasBeenCalled).toBeInstanceOf(Function);
    expect(nextFn.hasBeenCalled()).toEqual(false);
  });

  test('calling nextFn invalidate itself', () => {
    const nextFn = buildNextFnForTargetable({ target });
    jest.spyOn(nextFn, 'invalidate');

    nextFn(3);

    expect(nextFn.invalidate).toHaveBeenCalled();
    expect(nextFn.hasBeenCalled()).toEqual(true);
  });
});