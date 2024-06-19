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

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
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

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const registerParents = async (registerForm) => {
        try {
            const ParentsRegister = {
                "parentsName": registerForm.name,
                "parentsEmail": registerForm.email,
                "parentsPassword": registerForm.password
            }

            const response = await axios.post(`${apiUrl}/parents/register`, ParentsRegister);

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const loginParents = async (loginForm) => {
        try {
            const ParentsLogin = {
                "parentsEmail": loginForm.email,
                "parentsPassword": loginForm.password
            }

            const response = await axios.post(`${apiUrl}/parents/login`, ParentsLogin);

            if (response.data.success) {
                localStorage.setItem('currentParents', JSON.stringify(response.data.parentsCurr));
            }

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const loginStaff = async (loginForm) => {
        try {
             const response = await axios.post(`${apiUrl}/staff/login`, loginForm);

            if (response.data.success) {
                localStorage.setItem('currentStaff', JSON.stringify(response.data.staffCurr));
            }

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const loginAdmin = async (loginForm) => {
        try {
             const response = await axios.post(`${apiUrl}/admin/login`, loginForm);

            if (response.data.success) {
                localStorage.setItem('currentAdmin', JSON.stringify(response.data.admin));
            }

            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }


    // classs context data
    const actorContextData = {
        actorState,
        dispatch,
        registerTutor,
        loginTutor,
        registerParents,
        loginParents,
        loginStaff,
        loginAdmin
    }

    return (
        <ActorContext.Provider value={actorContextData}>
            {children}
        </ActorContext.Provider>
    )
}

export default ActorContextProvider