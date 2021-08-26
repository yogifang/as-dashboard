import { createContext, useContext , useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
 
  const [member , setMember] = useState('') ;
  const [loaded , setLoaded] = useState(false) ;
  let sharedState = {member , setMember , loaded , setLoaded} ;

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}