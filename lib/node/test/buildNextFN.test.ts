import { buildNextFnForTargetable } from '../src/buildNextFnForTargetable';

describe('buildNextFnForTargetable', () => {
  const exec = jest.fn();
  const target = { exec };

  it('returns a function with the correct default properties', () => {
    const nextFn = buildNextFnForTargetable({ target });

    expect(nextFn).toBeInstanceOf(Function);
    expect(nextFn.hasBeenCalled).toBeInstanceOf(Function);
    expect(nextFn.hasBeenCalled()).toEqual(false);
  });

  it('calling nextFn invalidate itself', () => {
    const nextFn = buildNextFnForTargetable({ target });
    jest.spyOn(nextFn, 'invalidate');

    nextFn(3);

    expect(nextFn.invalidate).toHaveBeenCalled();
    expect(nextFn.hasBeenCalled()).toEqual(true);
  });
});
