import React, { useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

function useWindowResize(destW = 1280) {
  const [state, toggle] = useState(true); // 默认设为true（屏幕大于1280） 防止初始化的时候导致页面再次渲染
  useResizeObserver(document.documentElement, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    if (width < destW) {
      toggle(false);
    } else {
      toggle(true);
    }
  });

  const handleToggle = () => {
    toggle((prev) => !prev);
  };

  return [state, handleToggle] as const;
}

export default useWindowResize;
