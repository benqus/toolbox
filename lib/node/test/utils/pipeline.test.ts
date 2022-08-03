/* eslint-disable @typescript-eslint/no-empty-function */
import { pipeline } from '../../src/utils/pipeline';

describe('pipeline', () => {
  test('chains supplied nodes together', () => {

    const target = null;
    const exec = () => {};
    const nodes = [0, 1, 2].map((id) => ({ id, target, exec }));

    const result = pipeline(...nodes);

    expect(nodes[0].target).toEqual(nodes[1]);
    expect(nodes[1].target).toEqual(nodes[2]);
    expect(nodes[2].target).toEqual(null);
    expect(result).toEqual(nodes);
  });
});
