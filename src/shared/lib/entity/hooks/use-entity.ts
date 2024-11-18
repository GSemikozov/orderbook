import React from 'react';

export const useEntity = <T>(createEntity: () => T, deps: unknown[]): T => {
  return React.useMemo(createEntity, deps);
};
