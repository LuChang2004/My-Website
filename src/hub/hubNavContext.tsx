import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type HubNavOpacityContextValue = {
  opacity: number;
  setOpacity: (opacity: number) => void;
};

const HubNavOpacityContext = createContext<HubNavOpacityContextValue | null>(null);

export function HubNavOpacityProvider({ children }: { children: ReactNode }) {
  const [opacity, setOpacity] = useState(1);
  const value = useMemo(() => ({ opacity, setOpacity }), [opacity]);

  return <HubNavOpacityContext.Provider value={value}>{children}</HubNavOpacityContext.Provider>;
}

export function useHubNavOpacity() {
  const context = useContext(HubNavOpacityContext);
  if (!context) {
    throw new Error('useHubNavOpacity must be used within HubNavOpacityProvider');
  }
  return context;
}
