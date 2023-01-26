import { NextFn } from '../pipe';

export function createNextFn(): NextFn {
  return jest.fn();
}
