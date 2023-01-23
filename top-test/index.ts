import { topic, observable, pipe, Fn, Publisher } from '@b/top';

// ///// //
// TOPIC //
// ///// //

type Args = [ number, number, number ];

// create a topic
const myTopic = topic<Args>();

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

