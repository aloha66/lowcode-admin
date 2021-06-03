import React, { useEffect } from 'react';

export type ResizeObserverCallback = (
  entries: ReadonlyArray<ResizeObserverEntry>,
  observer: ResizeObserver,
) => void;

export function useResizeObserver<T extends Element | null>(
  target: T,
  callback: ResizeObserverCallback,
) {
  let observer: ResizeObserver | undefined;
  const isSupported = window && 'ResizeObserver' in window;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  useEffect(() => {
    if (isSupported && window && target) {
      observer = new window.ResizeObserver(callback);
      observer!.observe(target as Element);
    }

    return () => cleanup();
  }, [target]);
}
