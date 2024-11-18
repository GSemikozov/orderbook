import { relationsPropertiesSymbol, relationsListPropertiesSymbol } from './decorators';

type BaseEntityConstructorOptions = {
  __from?: string;
} & Record<string, unknown>;

export abstract class BaseEntity {
  constructor(options: BaseEntityConstructorOptions | null) {
    const relationsProperties: string[] = Reflect.getMetadata(relationsPropertiesSymbol, this) || [];
    const relationsListProperties: string[] = Reflect.getMetadata(relationsListPropertiesSymbol, this) || [];

    relationsProperties.forEach(key => this.setRelationProperty(options, key));
    relationsListProperties.forEach(key => this.setRelationListProperty(options, key));
  }

  //
  private setRelationProperty = (options: BaseEntityConstructorOptions | null, propertyKey: string): void => {
    // @ts-ignore: Complex types resolving related to reflect metadata flow
    this[propertyKey] = {
      __from: options?.__from,
      args: options?.[propertyKey] ?? null,
    };
  };

  //
  private setRelationListProperty = (options: BaseEntityConstructorOptions | null, propertyKey: string): void => {
    // @ts-ignore: Complex types resolving related to reflect metadata flow
    this[propertyKey] = options?.[propertyKey] ?? [];
  };

  *[Symbol.iterator](): Generator {
    for (const key in this) {
      yield this[key];
    }
  }
}
