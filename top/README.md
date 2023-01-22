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

### Topic

Topics are simple functions that you can listen to and leave when you are done listening to them.

TypeScript example:
```ts
import { topic } from '@b/top';

// create a topic
const myTopic = topic<[number, number, number]>();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const leaveMyTopic = myTopic.listen(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
leaveMyTopic();

// push more data - not logged
myTopic(4, 5, 6);
```

> **Note**: Notice the topic argument listed as a generic Array of types!

### Observable

Like topics, Observables are functions as well that you can listen to.
Observables update when you pass an input parameter to them. Default value is `null`.
When an update happens, all listeners are notified with the new value and the previous value as listener parameters.

TypeScript example:
```ts
import { observable } from '@b/top';

interface MyValue {
  value: number;
}

// create observable
const myObservable = observable<MyValue>();

// listen (subscrube) to changes in the value of the observable
// method returns a function to unobserve (unsubscribe)
const unobserve = myObservable.listen((newValue: MyValue, oldValue: MyValue): void => {
  console.log(newValue);
  console.log(oldValue);
});

// update observable
myObservable({ value: 1 });

// unobserve observable
unobserve();

// update observable again - not logged
myObservable({ value: 2 });

// return the latest value of the observable
console.log(myObservable.latest());

```

