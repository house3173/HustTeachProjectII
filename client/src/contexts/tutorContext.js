import { createContext,  useReducer, useState } from "react";
import axios from "axios";
import { tutorReducer } from "../reducers/tutorReducer";
import { apiUrl } from "./constants";

export const TutorContext = createContext()

const TutorContextProvider = ({children}) => {
    // State
    const [tutorState, dispatch] = useReducer(tutorReducer, {
        am_tag: 'BasicInfo'
    })

    const saveTutorInfo = async (infoForm) => {
        try {
            const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
            const tutorInfoForm = {
                "tutorId": currentTutor.tutorId,
                "tutorImage": "",
                "tutorFileUni": "",
                "tutorName": infoForm.fullName,
                "tutorPhone": infoForm.phoneNumber,
                "tutorGender": infoForm.gender,
                "tutorYear": infoForm.birthYear,
                "tutorType": infoForm.role,
                "tutorUni": infoForm.university,
                "tutorMajor": infoForm.major,
                "tutorStart": infoForm.startTime,
                "tutorEnd": infoForm.endTime,
            }
        
            const response = await axios.post(`${apiUrl}/tutor/saveInfo`, tutorInfoForm);
            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const getTutorInfo = async (tutor) => {
        try {
            const response = await axios.post(`${apiUrl}/tutor/getInfo`, tutor);
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const saveTutorAchi = async (formData) => {
        try {
            const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
            const tutorAchiForm = {
                "tutorId": currentTutor.tutorId,
                "tutorAchi1": formData[1],
                "tutorAchi2": formData[2],
                "tutorAchi3": formData[3],
                "tutorAchi4": formData[4],
                "tutorAchi5": formData[5],
                "tutorAchi6": formData[6],
                "tutorAchi7": formData[7],
                "tutorAchi8": formData[8],
            }
        
            const response = await axios.post(`${apiUrl}/tutor/saveAchievement`, tutorAchiForm);
            return response.data

        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const getTutorAchi = async (tutor) => {
        try {
            const response = await axios.post(`${apiUrl}/tutor/getAchievement`, tutor);
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
        }
    }

    const tutorContextData = {
        tutorState,
        dispatch,
        saveTutorInfo,
        getTutorInfo,
        saveTutorAchi,
        getTutorAchi
    }

    return (
        <TutorContext.Provider value={tutorContextData}>
            {children}
        </TutorContext.Provider>
    )
}

export default TutorContextProvider