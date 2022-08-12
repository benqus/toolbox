import { pipe, share, topic, join } from '../src';

// Test

function increment(n: number, i: number): number[] {
  return [n + i, i];
}

function exponent(n: number, i: number): number[] {
  return [n * i, i];
}

const incrementPipe = pipe(
  increment,
  increment,
  (i) =>
    new Promise((r) => {
      console.log('Pausing execution...', new Date().toISOString(), i);
      setTimeout(() => {
        console.log('Resuming execution...', new Date().toISOString());
        // r(i);
        r(0);
      }, 1000);
    }),
  increment,
  increment,
  console.log,
  stop,
  increment
);

const exponentPipe = pipe(
  () => console.log('ExponentPipeline'),
  exponent,
  exponent,
  exponent,
  exponent,
  console.log
);

const p = pipe(
  incrementPipe,
  exponentPipe
);
p(0, 1);

const s = share(
  incrementPipe,
  exponentPipe
);
s(2);

const t = topic()
  .$subscribe(incrementPipe)
  .$subscribe(exponentPipe);
t(4);

const j = join(
  [ incrementPipe, exponentPipe ],
  console.log,
);

j('a', 'b');
