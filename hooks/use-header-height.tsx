'use client';

import { useEffect, useState } from 'react';

export function useHeaderHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('header-id');
    if (!header) return;

    const updateHeight = () => {
      setHeight(header.offsetHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return height;
}
