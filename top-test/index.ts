import { topic, Topic, observable, Fn, Publisher } from '@benqus/top';

// ///// //
// TOPIC //
// ///// //

type Args = [ number, number, number ];

// create a topic
const myTopic: Topic<Args> = topic<Args>();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const unsubscribe = myTopic.subscribe(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
unsubscribe();

// push more data - not logged
myTopic(4, 5, 6);

// Custom Topic

const customPublisher: Publisher<Args> = (publish: Fn<Args>, args: Args): void => {
  // Do something here
  // ...

  // ...
  // then notify the subscribers
  setTimeout(() => publish(...args), 1000);
};

const customTopic = topic<Args>(customPublisher);
customTopic.subscribe(console.log);
customTopic(7, 8, 9);

// ////////// //
// OBSERVABLE //
// ////////// //

interface MyValue {
  value: number;
}

// create observable
const myObservable = observable<MyValue>({ value: 0 });

// listen (subscrube) to changes in the value of the observable
// method returns a function to unobserve (unsubscribe)
const unobserve = myObservable.subscribe((newValue: MyValue): void => {
  console.log(newValue);
});

// update observable
myObservable.value = 1;

// unobserve observable
unobserve();

// update observable again - not logged
myObservable.value = 2;

// //// //
// PIPE //
// //// //
import { pipe, Pipe, operators } from '@benqus/top';

interface A {
  a: string;
  b: string;
  c: string;
  d: string;
}

type B = Pick<A, 'a'|'b'>;

type Params = [ A ];
type Outputs = [ B ];

const { delay, pick } = operators;

const pipeline: Pipe = pipe<Params, Outputs>(
  delay(1000),
  pick('a', 'b'),
);
pipeline.subscribe((b: B): void => {
  console.timeLog('pipeline', 'pipeline output (B):', b);
  console.timeEnd('pipeline');
});

console.time('pipeline');

// push data through the pipe
pipeline({
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
});

// Example 2
interface AppState {
  [key: string]: unknown;
  isLoaded: boolean;
  isReady: boolean;
}

const { reduce, distinctReduce, fanout, filter } = operators;

// create an application state with (optionally nested) observables
const appState = observable<AppState>({
  isLoaded: false,
  isReady: false,
  // ...
});

// create a notification pipe
const appStateIsLoadedUpdate = pipe(
  fanout((appState: AppState): void => {
    console.log('AppState is changing to', appState);
  }),
  distinctReduce(({ isLoaded }: AppState): boolean => isLoaded),
  reduce(({ isLoaded }: AppState): boolean => isLoaded),
  filter(Boolean),
);

// subscribe pipe to state changes
appState.subscribe(appStateIsLoadedUpdate);

// subscribe to pipe noitification when AppState#isLoaded is set to `true`
appStateIsLoadedUpdate.subscribe((): void => {
  console.log('App is loaded!');
});

// change state that WILL trigger an update
appState.isLoaded = true;

// change state that WILL NOT trigger an update
appState.isLoaded = false;
appState.isReady = true;

import { NextFn } from '@benqus/top';

type State = 'on' | 'off';
interface HistoryEntry {
  at: Date;
  state: State;
}

// custom operator that generates and preserves the last 10 history entries when the state changes
const historyPipe = pipe<[ State ], [ Array<HistoryEntry> ]>(
  distinctReduce<State>((state: State) => state, 'off'),
  (function () {
    let history: Array<HistoryEntry> = [];

    return (next: NextFn, state: State) => {
      const at = new Date();
      history.push({ at, state });
      history = history.slice(-10);
      next(history);
    }
  }()),
);

historyPipe.subscribe((history: Array<HistoryEntry>): void => {
  console.log('history', history);
})

// push data through the pipe
historyPipe('on');
historyPipe('on');
historyPipe('off');
historyPipe('on');
historyPipe('off');
historyPipe('on');
historyPipe('off');
historyPipe('on');
historyPipe('off');
historyPipe('off');
historyPipe('on');
historyPipe('off');
historyPipe('on');
historyPipe('off');
historyPipe('off');
historyPipe('on');
historyPipe('on');
