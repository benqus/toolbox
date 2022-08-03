import { IExecutable } from '../types';

export function workflow(...pipelines: Array<Array<IExecutable<unknown>>>): Array<Array<IExecutable<unknown>>> {
  let [currentPipeline] = pipelines;

  pipelines.slice(1).forEach((nextPipeline: Array<IExecutable<unknown>>) => {
    currentPipeline[currentPipeline.length - 1].target = nextPipeline[0];
    currentPipeline = nextPipeline;
  });

  return pipelines;
}
