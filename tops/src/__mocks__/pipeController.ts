import { IPipeController } from '../pipe';

export function createMockPipeController(): IPipeController {
  const next = jest.fn();
  const end = jest.fn();
  return { next, end };
}
