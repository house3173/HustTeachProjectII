import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import StaffFooter from "../../components/staff/StaffFooter"
import StaffLoginForm from "../../components/staff/StaffLoginForm"
import { useContext, useEffect } from "react"
import { ActorContext } from "../../contexts/actorContext"
import Footer from "../../components/home/Footer"

const StaffLogin = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    useEffect(() => {
        console.log('staff login')
        dispatch({type: "RESET_ACTOR", payload : "staffLogin"})
    }, [])
    // console.log(actorState.actor)
    // const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

	return (
        <>
            <Header roleHeader = {'staffLogin'}/>
            <NavbarMenu/>
            <StaffLoginForm/>
            <Footer/>
        </>
	)
}

export default StaffLogin