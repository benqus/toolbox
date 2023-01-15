import { topic, observable, state, pipe } from '@b/tops/build/tops.mjs';

// create a topic
const myTopic = topic();

// listen (subscrube) to data pushed through the topic
// method returns a function to leave (unsubscribe) the topic
const leaveMyTopic = myTopic.listen(console.log);

// push data through the topic
myTopic(1, 2, 3);

// leave myTopic
leaveMyTopic();

// push more data
myTopic(4, 5, 6);
