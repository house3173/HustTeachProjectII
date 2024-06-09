import { createContext,  useReducer, useState } from "react";
import axios from "axios";
import { actorReducer } from "../reducers/actorReducer";
import { apiUrl } from "./constants";

export const ActorContext = createContext()

const ActorContextProvider = ({children}) => {
    // State
    const [actorState, dispatch] = useReducer(actorReducer, {
        actor: 'mainHome'
    })

    const registerTutor = async (registerForm) => {
        try {
            const tutorRegister = {
                "tutorName": registerForm.name,
                "tutorEmail": registerForm.email,
                "tutorPassword": registerForm.password
            }

            const response = await axios.post(`${apiUrl}/tutor/register`, tutorRegister);

            // trả về toàn bộ phản hồi của server
            return response.data

        } catch (error) {
            // Lỗi do server gửi (LTV thực hiện)
            if (error.response.data) return error.response.data
            // Lỗi khác do hệ thống gửi
			else return { success: false, message: error.message }
        }
    }

    const loginTutor = async (loginForm) => {
        try {
            const tutorLogin = {
                "tutorEmail": loginForm.email,
                "tutorPassword": loginForm.password
            }

            const response = await axios.post(`${apiUrl}/tutor/login`, tutorLogin);

            if (response.data.success) {
                localStorage.setItem('currentTutor', JSON.stringify(response.data.tutorCurr));
            }

            // trả về toàn bộ phản hồi của server
            return response.data

        } catch (error) {
            // Lỗi do server gửi (LTV thực hiện)
            if (error.response.data) return error.response.data
            // Lỗi khác do hệ thống gửi
			else return { success: false, message: error.message }
        }
    }


    // classs context data
    const actorContextData = {
        actorState,
        dispatch,
        registerTutor,
        loginTutor
    }

    return (
        <ActorContext.Provider value={actorContextData}>
            {children}
        </ActorContext.Provider>
    )
}

export default ActorContextProvider