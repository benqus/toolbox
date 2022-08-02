import { IChainable, IMultiTargetable } from '../types';

export class EmitterNode<T = unknown> implements IMultiTargetable<T> {
  public readonly targets: Set<IChainable<T>> = new Set();
  
  public addTarget(executable: IChainable<T>): void {
    this.targets.add(executable);
  }

  public removeTarget(executable: IChainable<T>): void {
    this.targets.delete(executable);
  }

  public exec(input: T): void {
    this.targets.forEach((target: IChainable<T>): void => target.exec(input));
  }
}
