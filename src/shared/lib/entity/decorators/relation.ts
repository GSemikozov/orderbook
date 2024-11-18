import 'reflect-metadata';

import type { BaseEntity } from '../entity';

const relationsPropertiesSymbol = Symbol('relationsProperties');

const Relation = (getType: () => BaseEntity) => (target: ObjectConstructor, key: string) => {
  const relationsProperties = Reflect.getMetadata(relationsPropertiesSymbol, target) || [];

  if (!relationsProperties.includes(key)) {
    relationsProperties.push(key);
  }

  Reflect.defineMetadata(relationsPropertiesSymbol, relationsProperties, target);

  const descriptor = Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return Reflect.getOwnMetadata(key, this);
    },
    set: function (valueForSet) {
      const { args, __from = [] } = valueForSet;

      const type = getType() as unknown as ObjectConstructor;
      const currentConstructorName = this.constructor.name;
      const canSetRelation = !__from.includes(type.name);

      let value: BaseEntity | null = null;

      if (canSetRelation) {
        value = Reflect.construct<any, any>(type, [{ ...args, __from: [...__from, currentConstructorName] }]);
      }

      Reflect.defineMetadata(key, value, this);
    },
  });

  return descriptor;
};

export { relationsPropertiesSymbol, Relation };
