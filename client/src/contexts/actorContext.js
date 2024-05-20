import { createContext,  useReducer, useState } from "react";
import axios from "axios";
import { actorReducer } from "../reducers/actorReducer";

export const ActorContext = createContext()

const ActorContextProvider = ({children}) => {
    // State
    const [actorState, dispatch] = useReducer(actorReducer, {
        actor: 'mainHome'
    })


    // classs context data
    const actorContextData = {
        actorState,
        dispatch
    }

    return (
        <ActorContext.Provider value={actorContextData}>
            {children}
        </ActorContext.Provider>
    )
}

export default ActorContextProvider