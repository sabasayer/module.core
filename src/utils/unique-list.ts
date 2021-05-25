export class UniqueList<T> extends Array<T> {
  constructor(private compareFn: (a: T, b: T) => boolean, value?: T[]) {
    super();
    if (value) this.push(...value);
  }

  push(...items: T[]): number {
    const filteredItems = items.filter((e) =>
      this.every((i) => !this.compareFn(e, i))
    );
    return super.push(...filteredItems);
  }

  remove(item: T): number {
    const index = this.findIndex((e) => this.compareFn(e, item));
    if (index > -1) this.splice(index, 1);
    return index;
  }

  compare(a: T, b: T): boolean {
    return this.compareFn(a, b);
  }
}

export const createUniqueList = <T>(
  compareFn: (a: T, b: T) => boolean,
  value?: T[]
) => new UniqueList<T>(compareFn, value);
