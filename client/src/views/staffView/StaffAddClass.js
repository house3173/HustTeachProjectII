import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import AccountManagement from "../../components/tutor/AccountManagement"
import Footer from "../../components/home/Footer"

import { useContext } from "react"
import { ActorContext } from "../../contexts/actorContext"
import FormAddClass from "../../components/classes/FormAddClass"

const StaffAddClass = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <FormAddClass/>
            <Footer/>
        </>
	)
}

export default StaffAddClass