import { EmitterNode } from '../../src/nodes/EmitterNode';

describe('EmitterNode', () => {
  const exec1 = jest.fn();
  const exec2 = jest.fn();
  const target1 = { exec: exec1 };
  const target2 = { exec: exec2 };

  test('addTarget', () => {
    const node = new EmitterNode();
    node.addTarget(target1);

    expect(node.targets.has(target1)).toBe(true);
  });

  test('addTarget', () => {
    const node = new EmitterNode();
    node.addTarget(target1);
    node.removeTarget(target1);

    expect(node.targets.has(target1)).toBe(false);
  });

  test('emits input', () => {
    const input = [ 1, 2 ];
    const node = new EmitterNode();
    node.addTarget(target1);
    node.addTarget(target2);

    node.exec(input);

    expect(exec1).toHaveBeenCalledWith(input);
    expect(exec2).toHaveBeenCalledWith(input);
  });
});
