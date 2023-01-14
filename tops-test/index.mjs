import { topic } from '@b/tops/dist/module';

const myTopic = topic();
myTopic.listen(console.log);

myTopic(1, 2, 3);
