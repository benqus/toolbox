import { topic, observable, state, pipe } from '@b/tops';

// ///// //
// TOPIC //
// ///// //

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

// ////////// //
// OBSERVABLE //
// ////////// //

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

// ///// //
// STATE //
// ///// //

interface MyState {
  a: string;
  b: number;
  c: Array<number> | null;
}

// create state
const myState = state<MyState>({
  a: 'hello world!',
  b: 3.14,
  c: null,
});

const offMyState = myState.listen((serializedState: MyState): void => {
  console.log('State updated to:', serializedState);
});

// setting an existing observables value
myState.set('c', [ 1, 2, 3]);

// get an observable
const observableA = myState.get('a');
// update observable -> update state observable is mapped in
observableA('hakuna matata');

// get latest value of an observable
const b = myState.value('b');
console.log('value of "b"', b);

offMyState();
