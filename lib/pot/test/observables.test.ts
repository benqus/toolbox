import { observable, join } from '../src';

const o1 = observable(1);
const o2 = observable(2);
const o3 = observable(3);

describe('timer', () => {
  test('timer_ flows', () => {
    const sub = jest.fn();
    const join_ = join(
      [ o1, o2, o3 ],
    );

    join_.topic.subscribe(sub);

    o3(4);

    expect(sub).toHaveBeenCalledTimes(1);
    expect(sub).toHaveBeenCalledWith([1, 2, 4]);
  });
});
