import { ReactNode, createContext, useContext, useState } from "react";

type ContextValue = {
  mobileSideBarNav: boolean;
  updateMobileSideBarNav: (newValue: boolean) => void;
};

const StateContext = createContext<ContextValue | undefined>(undefined);

type StateProviderProps = {
  children: ReactNode;
};

export function StateProvider({ children }: StateProviderProps) {
  const [mobileSideBarNav, setMobileSideBarNav] = useState<boolean>(false);

  const updateMobileSideBarNav = (newValue: boolean) => {
    setMobileSideBarNav(newValue);
  };

  return (
    <StateContext.Provider value={{ mobileSideBarNav, updateMobileSideBarNav }}>
      {children}
    </StateContext.Provider>
  );
}


export const useStateValue = (): ContextValue => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context;
}