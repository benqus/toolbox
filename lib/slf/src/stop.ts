
export interface IStop {
  stop: true;
}

export const Stop: IStop = {
  stop: true,
};

export function stop(...args: Array<unknown>): IStop {
  console.info('Stop at', ...args);
  return Stop;
}
