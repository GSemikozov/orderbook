import { BaseEntity } from './entity';

type Items = unknown[] | null;

type Constructor<T extends BaseEntity> = new (...args: any[]) => T;

export class EntityList<T extends BaseEntity> {
  #entities: T[];
  #count: number;

  get entities(): T[] {
    return this.#entities;
  }

  get count(): number {
    return this.#count;
  }

  constructor(classEntity: Constructor<T>, items: Items, count?: number | null) {
    const Entity = classEntity;

    const trustItems = items ?? [];

    this.#count = count ?? trustItems.length;
    this.#entities = trustItems.map(item => new Entity(item));
  }

  *[Symbol.iterator](): Generator<T> {
    for (const key in this.#entities) {
      yield this.#entities[key];
    }
  }
}
