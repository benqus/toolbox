import { state } from './state';

describe('state', () => {
  test('create', () => {
    const s = state();

    expect(typeof s.get).toEqual('function');
    expect(typeof s.set).toEqual('function');
    expect(typeof s.value).toEqual('function');
    expect(typeof s.listen).toEqual('function');
    expect(typeof s.kill).toEqual('function');
  });

  test('empty state returns new empty object', () => {
    const s = state();

    const r1 = s();
    const r2 = s();

    expect(r1).toEqual({});
    expect(r1).toEqual({});
    expect(r1 !== r2).toBe(true);
  });

  test('create observable via set', () => {
    const s = state<{ a: object }>();
    const key = 'a';
    const value = { a: 'bla' };

    s.set(key, value);

    expect(typeof s.get(key)).toEqual('function');
    expect(s.value(key)).toEqual(value);
    expect(s()).toEqual({
      a: value,
    });
  });

  test('create observable via state default', () => {
    const a = { a: 'bla' };
    const s = state<{ a: object }>({ a });

    expect(typeof s.get('a')).toEqual('function');
    expect(s.value('a')).toEqual(a);
    expect(s()).toEqual({ a });
  });

  test('listen', () => {
    const s = state<{ a: object, b: object }>();

    const mockFn = jest.fn();
    s.listen(mockFn);

    s.set('a', { a: 100 });
    s.set('b', { b: 200 });

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn.mock.calls[0][0].a).toEqual(s.value('a'));
    expect(mockFn.mock.calls[1][0].a).toEqual(s.value('a'));
    expect(mockFn.mock.calls[1][0].b).toEqual(s.value('b'));
  });

  test('unlisten', () => {
    const s = state<{ a: object, b: object }>();

    const mockFn = jest.fn();
    const u = s.listen(mockFn);

    s.set('a', { a: 100 });
    u(); // unlisten

    s.set('b', { b: 200 });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn.mock.calls[0][0].a).toEqual(s.value('a'));
  });

  test('kill', () => {
    const a = { a: 'bla' };
    const s = state({ a });

    s.kill();

    expect(s()).toEqual({});
  });
});
