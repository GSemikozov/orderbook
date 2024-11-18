import React from 'react';

export const useLazyRef = <T>(init: () => T): React.MutableRefObject<T | undefined> => {
  const ref = React.useRef<T | undefined>(undefined);

  if (!ref.current) {
    ref.current = init();
  }

  return ref;
};
