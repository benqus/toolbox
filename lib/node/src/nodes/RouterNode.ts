import { IChainable, IRouteable } from '../types';

export class RouterNode<T = unknown> implements IRouteable<T> {
  public readonly targets: Map<keyof T, [ T[keyof T], IChainable<T> ]> = new Map();

  public matcher(routingProp: keyof T, matchValue: T[keyof T], value?: T[keyof T]): boolean {
    return matchValue === value;
  }
  
  public route(routingProp: keyof T, matchValue: T[keyof T], executable: IChainable<T>): void {
    this.targets.set(routingProp, [ matchValue, executable ]);
  }

  public unroute(routingProp: keyof T): void {
    this.targets.delete(routingProp);
  }

  public exec(input: T): void {
    this.targets.forEach(([ matchValue, target ]: [ T[keyof T], IChainable<T> ], routingProp: keyof T): void => {
      if (this.matcher(routingProp, matchValue, input[routingProp])) {
        target.exec(input);
      }
    });
  }
}
