import { ObservableNode } from '../../src/nodes/ObservableNode';

describe('ObservableNode', () => {
  const exec = jest.fn();
  const target = { exec };

  test('setting value calls target', () => {
    const value = [ 1, 2 ];
    const node = new ObservableNode();
    node.target = target;
    node.value = value;

    expect(exec).toHaveBeenCalledWith(value);
  });

  test('StateNode#exec sets value', () => {
    const value = [ 1, 2 ];
    const node = new ObservableNode();
    
    node.exec(value);

    expect(node.value).toEqual(value);
  });
});
