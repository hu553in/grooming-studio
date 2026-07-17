import { createContext, useContext } from 'react';

export interface MetrikaAPI {
  hit: (opts?: ym.HitOptions<unknown>) => void;
  reachGoal: (opts?: ym.VisitParameters) => void;
  extLink: (url: string, opts?: ym.ExtLinkOptions<unknown>) => void;
}

export const MetrikaContext = createContext<MetrikaAPI | null>(null);

export function useMetrika() {
  const context = useContext(MetrikaContext);
  if (!context) {
    throw new Error('useMetrika must be used within <MetrikaProvider>');
  }
  return context;
}
