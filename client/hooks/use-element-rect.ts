import { useCallback, useEffect, useRef, useState } from 'react';

export function useElementRect<T extends HTMLElement>() {
  const nodeRef = useRef<T | null>(null);
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  const measure = useCallback(() => {
    const n = nodeRef.current;
    if (n) {
      setRect(n.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    const n = nodeRef.current;
    if (!n) {
      return;
    }

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(n);

    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    measure();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, [measure]);

  const setRef = useCallback((node: T | null) => {
    nodeRef.current = node;
    if (node) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return { rect, setRef, ref: nodeRef };
}
