import { ExecNode, NextFN } from '../src/ExecNode';

function createMockNextFn() {
  const mockNextFn = jest.fn() as (jest.Mock & {
    hasBeenCalled();
    invalidate();
  });

  mockNextFn.hasBeenCalled = jest.fn();
  mockNextFn.invalidate = jest.fn();

  return mockNextFn;
}

jest.mock('../src/buildNextFnForTargetable', () => ({
    buildNextFnForTargetable: jest.fn(createMockNextFn)
}));

describe('ExecNode', () => {
  const exec = jest.fn();
  const target = { exec };

  const error = console.error;
  beforeAll(() => console.error = () => {});
  afterAll(() => console.error = error);

  it('calls executor with input and next function', () => {
    let receivedNextFn: any = null;
    let receivedInput: any = null;
    const input = [ 1, 2 ];
    const node = new ExecNode((i, n) => {
      receivedNextFn = n;
      receivedInput = i;
    });

    node.exec(input);

    expect(receivedInput).toEqual(input);
    expect(typeof receivedNextFn).toEqual('function');
  });

  it('executes executor', () => {
    const executorSpy = jest.fn();
    const input = [ 1, 2 ];
    const node = new ExecNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(executorSpy.mock.calls.length).toEqual(1);
    expect(executorSpy.mock.lastCall[0]).toEqual(input);
    expect(typeof executorSpy.mock.lastCall[1]).toEqual('function');
  });

  it('invalidates next after calling the exec', () => {
    const { buildNextFnForTargetable } = jest.requireMock('../src/buildNextFnForTargetable');
    const mockNextFn = createMockNextFn();
    
    buildNextFnForTargetable.mockReturnValue(mockNextFn);

    let nextFn: NextFN<any> = createMockNextFn();
    const input = [ 1, 2 ];
    const node = new ExecNode((_, n) => {
      nextFn = n;
    });

    node.exec(input);

    expect(nextFn).toEqual(mockNextFn);
    expect(nextFn.invalidate).toHaveBeenCalled();
  });

  it('next target.exec when output is returned', () => {
    const executorSpy = jest.fn(() => output);
    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const node = new ExecNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  it('next target.exec when next is called', () => {
    const { buildNextFnForTargetable } = jest.requireMock('../src/buildNextFnForTargetable')

    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const executorSpy = jest.fn((_, next) => next(output));
    const mockNextFn = createMockNextFn();
    mockNextFn.mockReturnValue(output);
    
    buildNextFnForTargetable.mockReturnValue(mockNextFn);

    const node = new ExecNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  it('next target.exec when executor returns the output', () => {
    const { buildNextFnForTargetable } = jest.requireMock('../src/buildNextFnForTargetable');

    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const executorSpy = jest.fn().mockReturnValue(output);
    const mockNextFn = createMockNextFn();
    mockNextFn.mockReturnValue(output);
    
    buildNextFnForTargetable.mockReturnValue(mockNextFn);

    const node = new ExecNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  it('next target.exec when executor is async / returns a promise', () => {
    const input = [ 1, 2 ];
    const output = [ 3, 4 ];
    const then = (fn: Function) => fn(output);
    const promise = { then };
    const executorSpy = jest.fn().mockReturnValue(promise);

    const node = new ExecNode(executorSpy);
    node.target = target;

    node.exec(input);

    expect(exec).toHaveBeenCalledWith(output);
  });

  it('throws error without executor', () => {
    const node = new ExecNode();

    expect(() => node.exec(0)).toThrow();
  });
});
