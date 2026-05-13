import React, { createContext, useContext, useMemo } from 'react';

interface MetrikaAPI {
  hit: (opts?: ym.HitOptions<unknown>) => void;
  reachGoal: (opts?: ym.VisitParameters) => void;
  extLink: (url: string, opts?: ym.ExtLinkOptions<unknown>) => void;
}

const MetrikaCtx = createContext<MetrikaAPI | null>(null);

export function MetrikaProvider({
  counterId,
  children,
}: {
  counterId: number;
  children: React.ReactNode;
}) {
  const api = useMemo<MetrikaAPI>(() => {
    return {
      hit: opts => {
        const url = window.location.href;
        window.ym(counterId, 'hit', url, opts);
      },
      reachGoal: opts => {
        const url = window.location.href;
        window.ym(counterId, 'reachGoal', url, opts);
      },
      extLink: (url, opts) => {
        window.ym(counterId, 'extLink', url, opts);
      },
    };
  }, [counterId]);

  return <MetrikaCtx.Provider value={api}>{children}</MetrikaCtx.Provider>;
}

export function useMetrika() {
  const ctx = useContext(MetrikaCtx);
  if (!ctx) throw new Error('useMetrika must be used within <MetrikaProvider>');
  return ctx;
}
