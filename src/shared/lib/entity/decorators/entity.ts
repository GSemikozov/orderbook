import 'reflect-metadata';

export const Entity = (name: string) => (target: any) => {
  Object.defineProperty(target, 'name', { value: name });
};
