import { StateNode } from '../src/StateNode';

describe('StateNode', () => {
  const exec = jest.fn();
  const target = { exec };

  const error = console.error;
  beforeAll(() => console.error = () => {});
  afterAll(() => console.error = error);

  it('setting value calls target', () => {
    const value = [ 1, 2 ];
    const node = new StateNode();
    node.target = target;
    node.value = value;

    expect(exec).toHaveBeenCalledWith(value);
  });

  it('StateNode#exec sets value', () => {
    const value = [ 1, 2 ];
    const node = new StateNode();
    
    node.exec(value);

    expect(node.value).toEqual(value);
  });
});
