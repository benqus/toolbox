import { topic, observable, pipe } from '@b/top';

// ///// //
// TOPIC //
// ///// //

// create a topic
const myTopic = topic<[number, number, number]>();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const unsubscribe = myTopic.subscribe(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
unsubscribe();

// push more data - not logged
myTopic(4, 5, 6);

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

