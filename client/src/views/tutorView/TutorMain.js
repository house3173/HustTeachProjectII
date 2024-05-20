import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import AccountManagement from "../../components/tutor/AccountManagement"
import Footer from "../../components/home/Footer"

import { useContext } from "react"
import { ActorContext } from "../../contexts/actorContext"

const TutorMain = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
	return (
        <>
            <Header roleHeader = {actorState.actor}/>
            <NavbarMenu/>
            <AccountManagement/>
            <Footer/>
        </>
	)
}

export default TutorMain