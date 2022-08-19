@b/pot
===

**P**ipes, **O**bservables & **T**opics!

---

Minimalistic, dependency-free tool to create execution pipelines, observables and topics in a reactive fashion for modern JavaScript & TypeScript applications.

The functional and function-based design allows for great flexibility and chaining, built in operators allow for easy-to-use flow-control.

Simple piping logic provides an easy way for developers to extend their own pipelines with custom synchronous or asynchronous operators using the control object.

## Pipe
---

Basic usage:
```ts
import { pipe } from "@b/pot";
import { filter, reduce, buffer, fanout } from "@b/pot/operators";

// create a pipeline
const aPipe = pipe(
  
  // filter based on inputs. If true, continue execution immediately
  filter(n => n % 2 === 0),

  // reduce inputs into one single output, continue execution immediately
  reduce(num => ({ num })),
  
  // collect arguments into a buffer, will continue only when buffer is full
  buffer(2),
  
  // fan out arguments to any pipe|observable|topic|function and continue execution immediately
  fanout(
    console.log // [ [ { num: 2 } ], [ { num: 4 } ] ]
  )
);

// subscribe to pipeline, invoked when pipeline completes
aPipe.topic.subscribe(([ [ a ], [ b ] ]) => {
  console.log(a, b); // { num: 2 } { num: 4 }
});

// push arguments through the pipeline
aPipe(1);
aPipe(2);
aPipe(3);
aPipe(4);
```

## Pipe - Operators

## Topic
---



## Observable
---


