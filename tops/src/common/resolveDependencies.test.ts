import { resolveDependencies } from './resolveDependencies';

describe('resolveDependencies', () => {
  test('works', () => {
    const defaults = {
      a: jest.fn(),
      b: jest.fn(),
    };
    const dependencies = {
      a: jest.fn(),
    };
    const r = resolveDependencies(dependencies, defaults);

    expect(r.a).toEqual(dependencies.a);
    expect(r.b).toEqual(defaults.b);
    expect(r !== dependencies).toBe(true);
    expect(r !== defaults).toBe(true);
  });
});
