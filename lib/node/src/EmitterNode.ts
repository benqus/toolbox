import { IExecutable, IMultiTargetable } from "./types";

export class EmitterNode<Input = unknown> implements IExecutable<Input>, IMultiTargetable<Input> {
  public readonly targets: Set<IExecutable<Input>> = new Set();
  
  public addTarget(executable: IExecutable<Input>): void {
    this.targets.add(executable);
  }

  public removeTarget(executable: IExecutable<Input>): void {
    this.targets.delete(executable);
  }

  public exec(input: Input): void {
    this.targets.forEach((target: IExecutable<Input>): void => target.exec(input));
  }
}
