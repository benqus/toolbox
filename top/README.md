`@benqus/top`
===

Simple is best. Topics, Observables, Pipes. Simple af.

This collection of JavaScript/TypeScript tools builds on built-in `object`s and `function`s.
No complex typings, endless conditions, massive/untraceable call-stacks, just minimal and specific purposes so your code can stay as explicit and self-explanatory as possible.
Don't we all like it when a library does its black magic and we don't know why, huh?

Best part is that because it's functions and objects, you can easily mock them for testing!

## Install

`npm i @benqus/top` or `yarn add @benqus/top` (if you like versioning your version control too...)

## Usage

- TypeScript: `import { topic, ... } from '@benqus/top';`
- CommonJS: `const { topic, ... } = require('@benqus/top');`
- ES Module: `import { topic, ... } from @benqus/tops/build/top.mjs;`

## 1. Topic

Topics are simple functions that you can subscribe to and unsubscribe when you are done with them.

Basic TypeScript example:
```ts
import { topic, Topic } from '@benqus/top';

type TopicArgs = [number, number, number];

// create a topic
const myTopic: Topic<TopicArgs> = topic<TopicArgs>();

// subscribe to data pushed through the topic
// returns a function to unsubscribe from the topic
const unsubscribe = myTopic.subscribe(console.log);

// push data through the topic
myTopic(1, 2, 3);

// unsubscribe from topic
unsubscribe();
```

> **Note**: Notice the topic argument listed as a generic Array of types!

Topics are also customiseable with their publish logic:
```ts
import { Fn, Publisher } from '@benqus/top';

type Args = [ number, number, number ];

const customPublisher: Publisher<Args> = (publish: Fn<Args>, args: Args): void => {
  // Do something here
  // ...
  // continue notifying the topic subscribers
  publish(...args);
};

const myTopic = topic<Args>(customPublisher);
```

> **Important**: When creating a custom publisher, you will be responsible to invoking the `publish` function! Without that the topic won't notify its subscribers.

#### Custom/Async Topics

Custom topics with basic **Throttle** and **Debounce** logic are provided by the library:
```ts
import { asyncTopic } from '@benqus/top';

// Throttled topic that publishes the last message every 10ms (default is 0ms)
const throttledTopic = asyncTopic.throttle(10); 
const debouncedTopic = asyncTopic.debounce(10); 
```

## 2. Observable

Observables are simple Proxied objects. They can have any value as their property, including topics, nested observables and pipes - in this case the root observable will automatically subscribe to the nested `ISubscribable`.

Observables must have a specific initial schema or interface as they are sealed after creation.

Basic TypeScript example:
```ts
import { observable, Observable } from '@benqus/top';

interface MyObservable {
  value: number;
  child: Observable<{ name: string }>;
}

// create observable
const myObservable: Observable<MyObservable> = observable<MyObservable>({
  value: 0,
  child: observable<{ name: string }>({
    name: 'John Doe'
  }),
});

// subscribe works the same way as for the topic
const unobserve = myObservable.subscribe(console.log);

// update observable via simple attribute assignments or `Object.assign`
myObservable.value = 1;
```

> **Note:** if you are using observables for state-management, it is recommended that you use a throttled topic - either the built-in solutions or your own custom one to bundle multiple updates into one update notification.

Observables come with a built-in topic that handles the notifications but it is possible to re/use existing topics:

```ts
import { asyncTopic, observable } from '@benqus/top';

// create throttled topic
const throttledTopic = asyncTopic.throttle<[unknown]>(0);
throttledTopic.subscribe(console.log);

// create observable with throttled topic
const obs = observable({ a: 5 }, throttledTopic);

// publish into throttled topic
throttledTopic({ a: 6});

// publish via the observable into throttled topic
obs.a = 7;
```

## 3. Pipe

Pipes are a pre-defined, ordered set of operations. Similar to RxJS's streams, however they are intentionally kept simple to avoid building overly complex pipelines that are hard to understand, maintain and debug.

There are a few basic built-in operators to help you get going but it is possible to implement fully custom operators. Pipes are a great too to help you linearise your code and keep your operators testable.

Pipes can receive any number of input paramters and output any number of parameters as well.

Simple TypeScript example:
```ts
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
pipeline({
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
});
```

Another way of using pipes is to build a signaling system based on the observables above:

```ts
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

// these changes WILL NOT trigger any updates
appState.isLoaded = false;
appState.isReady = true;
```

You can also subscribe to a Topic or another Pipe as Topics, Observables and Pipes have the same subscription mechanism.

### 3.1 Pipe Operators - Built-in, synchronous
 - `buffer` - bundle every X updates into one publish
 - `distinceReduce` - reduce inputs into one output that will be used to distinguish from previous updates
 - `fanout` - hook into the pipe without any side effects
 - `filter` - provided function should return a truthy value otherwise the pipe will stop the execution
 - `pick` - construct a new object and copy values from properties listed in the arguments
 - `reduce` - reduce inputs into one output
 - `skip` - skip the first X input updates
 - `take` - take the first X input updates but ignore anything after
 - `times` - repeat operations X times (clone updates)

### 3.2 Pipe Operators - Built-in, asynchronous
 - `throttle` - publish every X ms if updates are coming through
 - `debounce` -delay execution by X ms, any update with timeout will reset the timeout
 - `delay` - simply delay (wait) further execution by X ms

### 3.3 Pipe Operators - Custom

```ts
import { pipe, NextFn } from '@benqus/top';

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
```

## Goal

Build epic a/synchronous apps all over the stack, in a simplified way.

## License

MIT
