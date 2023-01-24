import { topic, Topic, observable, Observable, pipe, Pipe, operators } from '../src';

interface Person {
  name: string;
  age: number;
  dob: string;
}

type PersonNotification = [ Person ];

const { pick } = operators;

describe('integration', () => {
  let personTopic: Topic<PersonNotification>;
  let personObservable: Observable<Person>;
  let personPipeline: Pipe;

  let topicSubscriber: jest.Mock;
  let observableSubscriber: jest.Mock;
  let pipelineSubscriber: jest.Mock;

  beforeEach(() => {
    // topicSubscriber = jest.fn().mockImplementation(() => console.log('topicSubscriber'));
    // observableSubscriber = jest.fn().mockImplementation(() => console.log('observableSubscriber'));
    // pipelineSubscriber = jest.fn().mockImplementation(() => console.log('pipelineSubscriber'));

    topicSubscriber = jest.fn();
    observableSubscriber = jest.fn();
    pipelineSubscriber = jest.fn();

    personTopic = topic<PersonNotification>();
    personTopic.subscribe(topicSubscriber);
    
    personObservable = observable<Person>({
      name: '',
      age: 0,
      dob: '',
    }, personTopic);
    personObservable.subscribe(observableSubscriber);

    personPipeline = pipe<[Person], [Pick<Person, 'name' | 'age'>]>(
      pick('name', 'age'),
    );
    personPipeline.subscribe(pipelineSubscriber);
  });

  test('pipeline', () => {
    personPipeline({
      name: 'person',
      age: 10,
      dob: '22/12/2022',
    });

    expect(pipelineSubscriber).toHaveBeenCalledTimes(1);
    expect(pipelineSubscriber).toHaveBeenCalledWith({
      name: 'person',
      age: 10
    });
  });

  test('observable', async () => {
    personObservable.subscribe(personPipeline);

    personObservable.name = 'person';
    personObservable.age = 10;
    personObservable.dob = '22/12/2022';

    expect(pipelineSubscriber).toHaveBeenCalledTimes(3);
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(1, {
      name: 'person',
      age: 0,
    });
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(2, {
      name: 'person',
      age: 10,
    });
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(3, {
      name: 'person',
      age: 10,
    });
  });

  test('topic', async () => {
    const newTopic = topic<[Person]>();
    newTopic.subscribe((person: Person): Person => Object.assign(personObservable, person));

    personObservable.subscribe(personPipeline);

    newTopic({
      name: 'person',
      age: 10,
      dob: '22/12/2022',
    });

    expect(pipelineSubscriber).toHaveBeenCalledTimes(3);
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(1, {
      name: 'person',
      age: 0,
    });
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(2, {
      name: 'person',
      age: 10,
    });
    expect(pipelineSubscriber).toHaveBeenNthCalledWith(3, {
      name: 'person',
      age: 10,
    });
  });
});
