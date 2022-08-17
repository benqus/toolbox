import { pipe } from '../src';
import { reduce, fanout, filter, buffer } from '../src/operators';

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
