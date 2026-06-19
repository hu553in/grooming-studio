import { useCallback, useEffect, useState } from 'react';

const normalizeHash = (value: string | null | undefined) => {
  if (!value) {
    return '';
  }

  return value.startsWith('#') ? value : `#${value}`;
};

const getCurrentHash = () => {
  return normalizeHash(window.location.hash);
};

export function useHash() {
  const [hash, setHash] = useState(() => getCurrentHash());

  const hashChangeHandler = useCallback(() => {
    setHash(getCurrentHash());
  }, [setHash]);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);

    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, [hashChangeHandler]);

  const updateHash = useCallback((newHash: string) => {
    const normalized = normalizeHash(newHash);
    const current = getCurrentHash();

    if (normalized !== current) {
      window.location.hash = normalized;

      if (!normalized) {
        const baseUrl = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(null, '', baseUrl);
      }
    }
  }, []);

  const clearHash = useCallback(() => {
    updateHash('');
  }, [updateHash]);

  return { hash, updateHash, clearHash };
}
