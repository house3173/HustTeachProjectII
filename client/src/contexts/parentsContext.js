import { createContext,  useReducer, useState } from "react";
import axios from "axios";
import { apiUrl } from "./constants";

export const ParentsContext = createContext()

const ParentsContextProvider = ({children}) => {
    

    const ParentsContextData = {
        
    }

    return (
        <ParentsContext.Provider value={ParentsContextData}>
            {children}
        </ParentsContext.Provider>
    )
}

export default ParentsContextProvider