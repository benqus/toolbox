/* eslint-disable @typescript-eslint/no-empty-function */
import { createMockPipeController } from '../../__mocks__/pipeController';
import { pick } from './pick';

describe('pick', () => {
  test('fn', () => {
    const p = pick('a', 'b');

    expect(p).toEqual(expect.any(Function));
  });
  
  test('triggers next only if last value is not the same', () => {
    const optionsMock = createMockPipeController();
    const p = pick('a', 'b');
    const object1 = {
      a: 3,
      b: [5],
      c: 'bla',
      d() {},
    };
    const object2 = {
      a: 6,
      b: [9],
      c: 'bla',
      d() {},
    };
    const object3 = {
      a: 10,
      b: 'bla',
      c: {},
      d() {},
    };

    p(optionsMock, object1, object2, object3);

    expect(optionsMock.next).toHaveBeenCalledTimes(1);
    expect(optionsMock.next).toHaveBeenLastCalledWith(
      {
        a: object1.a,
        b: object1.b,
      },
      {
        a: object2.a,
        b: object2.b,
      },
      {
        a: object3.a,
        b: object3.b,
      },
    );
  });
});
