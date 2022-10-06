import React,{useContext,createContext,useReducer} from 'react'

const statecontext = createContext();

function StateProvider({initialstate,reducer,children}) {
  return (
    <statecontext.Provider value={useReducer(reducer,initialstate)}>
        {children}
    </statecontext.Provider>
  )
}

export default StateProvider

export const useStateprovider = () => useContext(statecontext);