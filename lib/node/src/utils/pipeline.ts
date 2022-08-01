import { IExecutable } from '../types';

export function pipeline<T = unknown>(...nodes: Array<IExecutable<T>>): Array<IExecutable<T>> {
  let [ currentNode ] = nodes;

  nodes.slice(1).forEach((nextNode: IExecutable) => {
    currentNode.target = nextNode;
    currentNode = nextNode;
  });

  return nodes;
}
