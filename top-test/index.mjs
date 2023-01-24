import { topic, observable, pipe } from '@b/top/build/top.mjs';

// create a topic
const myTopic = topic();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const unsubscribe = myTopic.subscribe(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
unsubscribe();

// push more data
myTopic(4, 5, 6);
