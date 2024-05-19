import { createContext,  useReducer, useState } from "react";
import { classReducer } from "../reducers/classReducer";
import axios from "axios";

export const ClassContext = createContext()

const ClassContextProvider = ({children}) => {
    // State
    const [classState, dispatch] = useReducer(classReducer, {
        class: null,
    })


    // classs context data
    const classContextData = {
        classState,
        dispatch
    }

    return (
        <ClassContext.Provider value={classContextData}>
            {children}
        </ClassContext.Provider>
    )
}

export default ClassContextProvider