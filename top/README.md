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

There are a few basic built-in operators to help you get going but it is entirely possible to implement fully custom operators - don't over-do it though...

To do...
