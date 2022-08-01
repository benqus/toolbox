import { ValueNode } from '../src/ValueNode';

describe('ValueNode', () => {
  const exec = jest.fn();
  const target = { exec };

  it('setting value calls target', () => {
    const value = [ 1, 2 ];
    const node = new ValueNode();
    node.target = target;
    node.value = value;

    expect(exec).toHaveBeenCalledWith(value);
  });

  it('StateNode#exec sets value', () => {
    const value = [ 1, 2 ];
    const node = new ValueNode();
    
    node.exec(value);

    expect(node.value).toEqual(value);
  });
});
