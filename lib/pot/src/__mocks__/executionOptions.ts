import { IExecutionOptions } from '../types';

export function createMockExecutionOptions(): IExecutionOptions {
  const next = jest.fn();
  const end = jest.fn();
  return { next, end };
}
