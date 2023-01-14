/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { pipe } from '../src';
import { throttle, reduce, fanout } from '../src/pipe/operators';

const timer = {
  startedAt: 0,
  duration: 200,
  get elapsedTime(): number { return Date.now() - this.startedAt; },
  ontick() {},
  onend() {},
  start(): void {
    this.startedAt = Date.now();
    this.tick();
  },
  tick() {
    if (this.elapsedTime < this.duration) {
      this.ontick();
      setTimeout(() => this.tick(), 0);
    } else {
      this.onend();
    }
  },
};

const target = jest.fn();
const timer_ = pipe(
  throttle(50),
  reduce((elapsedTime) => ({ elapsedTime })),
  fanout(
    target,
  ),
);

describe('timer', () => {
  test('timer_ flows', (done) => {
    timer.ontick = () => timer_(timer.elapsedTime);
    timer.onend = () => {
      try {
        expect(target.mock.calls.length).toEqual(4);
        expect(target.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(target.mock.calls[0][0]).toHaveProperty('elapsedTime');
        expect(target.mock.calls[0][1]).toHaveProperty('elapsedTime');
        expect(target.mock.calls[0][2]).toHaveProperty('elapsedTime');
        expect(target.mock.calls[0][3]).toHaveProperty('elapsedTime');
      } catch (e) {}
      done();
    };
        
    timer.start();
  });
});
