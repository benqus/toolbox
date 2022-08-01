import { IExecutable, ITargetable } from './types';

export class MergeNode<MergeType = unknown> implements IExecutable<MergeType>, ITargetable<MergeType> {
  private _value: Partial<MergeType> = {};

  constructor(initValue: Partial<MergeType>) {
    this._value = initValue;
  }

  public target: IExecutable<Partial<MergeType>> | null = null;

  public exec(value: Partial<MergeType>): void {
    this._value = Object.assign(this._value, value) as MergeType;
    this.target?.exec(this._value);
  }
}
