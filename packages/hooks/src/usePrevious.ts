import { useEffect, useRef } from 'react';

const usePrevious = <T>(state: T): T | undefined => {
  const ref = useRef<T>(state);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};

export { usePrevious };
