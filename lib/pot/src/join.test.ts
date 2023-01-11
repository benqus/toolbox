/* eslint-disable @typescript-eslint/no-empty-function */
import { join } from './join';
import { pipe } from './pipe';

describe('join', () => {
  test('creates joint pipe', () => {
    const j = join([]);

    expect(j).toEqual(expect.any(Function));
  });

  test('latest values come through when a pipe is executed', () => {
    const p1 = pipe();
    const p2 = pipe();

    p1(1, 2, 3);

    const exec1 = jest.fn(({ next }) => next(4, 5, 6));
    
    // create join pipe
    join(
      [p1, p2],
      exec1,
    );

    p1(4, 5, 6);
    p2('a', 'b', 'c');

    expect(exec1).toHaveBeenCalledTimes(2);
    expect(exec1).toHaveBeenNthCalledWith(1, expect.any(Object), [[4, 5, 6], []]);
    expect(exec1).toHaveBeenNthCalledWith(2, expect.any(Object), [[4, 5, 6], ['a', 'b', 'c']]);
  });

  test('creates join pipe only once', () => {
    const p1 = pipe();
    const p2 = pipe();

    const _join = join([p1, p2]);

    expect(_join).toEqual(expect.any(Function));
    expect(_join.subscribe).toEqual(expect.any(Function));
    expect(_join.unsubscribe).toEqual(expect.any(Function));
  });
});
