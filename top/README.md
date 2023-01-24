`@b/top`
===

Simple is best. Topics, Observables, Pipes. Simple and functional af.

This collection of tools builds on JavaScript's most powerful feature: functions.
No complex typings, endless conditions, massive/untraceable call-stacks, just pure functions with minimal and specific purposes so your code can stay as explicit and self-explanatory as possible. Don't we all like it when a library does its black magic and we don't know why, huh?

## Install

`npm i @b/top` or `yarn add @b/top` (if you like versioning your version control too...)

## Usage

- TypeScript: `import { topic } from '@b/top';`
- CommonJS: `const { topic } = require('@b/top');`
- ES Module: `@b/tops/build/top.mjs;`

## 1. Topic

Topics are simple functions that you can subscribe to and unsubscribe when you are done with them.

Basic TypeScript example:
```ts
import { topic, Topic } from '@b/top';

// create a topic
const myTopic = topic<[number, number, number]>();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const unsubscribe = myTopic.listen(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
const unsubscribe();

// push more data - not logged
myTopic(4, 5, 6);
```

> **Note**: Notice the topic argument listed as a generic Array of types!

Topics are also customiseable with their publish logic:
```ts
import { Fn, Publisher } from '@b/top';

type Args = [ number, number, number ];

const customPublisher: Publisher<Args> = (publish: Fn<Args>, args: Args): void => {
  // Do something here
  // ...

  // ...
  // then notify the subscribers
  publish(...args);
};

const myTopic = topic<Args>(customPublisher);
```

> **Important**: When creating a custom publisher, you will be responsible to invoking the `publish` function! Without that the topic won't notify its subscribers.

#### Custom/Async Topics

Custom topics with basic **Throttle** and **Debounce** logic are provided by the library:
```ts
import { asyncTopic } from '@/top';

// Throttled topic that publishes the last message every 10ms (default is 0ms)
const throttledTopic = asyncTopic.throttle(10); 
const debouncedTopic = asyncTopic.debounce(10); 
```

## 2. Observable

To do...