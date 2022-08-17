import { IExecutionOptions } from '../types';

export function isExecutionOptions(arg: unknown): boolean {
  return arg != null && typeof (arg as IExecutionOptions).next === 'function';
}
