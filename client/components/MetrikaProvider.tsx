import { type ReactNode, useMemo } from 'react';

import { type MetrikaAPI, MetrikaContext } from '@/components/MetrikaContext';

export function MetrikaProvider({
  counterId,
  children,
}: {
  counterId: number;
  children: ReactNode;
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

  return <MetrikaContext.Provider value={api}>{children}</MetrikaContext.Provider>;
}
