import { topic } from '@b/tops';

const myTopic = topic();
myTopic.listen(console.log);

myTopic(1, 2, 3);
