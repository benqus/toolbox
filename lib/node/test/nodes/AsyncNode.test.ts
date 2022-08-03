import { AsyncNode } from '../../src/nodes/AsyncNode';


describe('AsyncNode', () => {
  const exec = jest.fn();
  const target = { exec };

  test('calls executor with input and next function', () => {
    let receivedInput: unknown = null;
    const input = [ 1, 2 ];
    const node = new AsyncNode((i) => {
      receivedInput = i;
    });

    node.exec(input);

    expect(receivedInput).toEqual(input);
  });

  test('executes executor', () => {
    const executorSpy = jest.fn();
    const input = [ 1, 2 ];
    const node = new AsyncNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(executorSpy.mock.calls.length).toEqual(1);
    expect(executorSpy.mock.lastCall[0]).toEqual(input);
    expect(typeof executorSpy.mock.lastCall[1]).toEqual('function');
  });

  test('next target.exec when output is returned', () => {
    const executorSpy = jest.fn(() => output);
    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const node = new AsyncNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  test('next target.exec when executor returns the output', () => {
    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const executorSpy = jest.fn().mockReturnValue(output);
    
    const node = new AsyncNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  test('next target.exec when executor is async / returns a promise', () => {
    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const then = (fn) => fn(output);
    const promise = { then };
    const executorSpy = jest.fn().mockReturnValue(promise);

    const node = new AsyncNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  test('throws error without executor', () => {
    const node = new AsyncNode();

    expect(() => node.exec(0)).toThrow();
  });
});
