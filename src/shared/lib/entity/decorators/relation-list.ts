import 'reflect-metadata';
import { BaseEntity, EntityList } from '..';

const relationsListPropertiesSymbol = Symbol('relationsListProperties');

const RelationList = (getTypeList: () => EntityList<BaseEntity>) => (target: ObjectConstructor, key: string) => {
  const relationsListProperties = Reflect.getMetadata(relationsListPropertiesSymbol, target) || [];

  if (!relationsListProperties.includes(key)) {
    relationsListProperties.push(key);
  }

  Reflect.defineMetadata(relationsListPropertiesSymbol, relationsListProperties, target);

  const descriptor = Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,

    get: function () {
      return Reflect.getOwnMetadata(key, this);
    },

    set: function (valueForSet) {
      const typeList = getTypeList() as unknown as ObjectConstructor;
      const value = Reflect.construct<any, any>(typeList, [valueForSet])?.entities ?? [];

      Reflect.defineMetadata(key, value, this);
    },
  });

  return descriptor;
};

export { relationsListPropertiesSymbol, RelationList };
