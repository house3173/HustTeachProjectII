import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import Footer from "../../components/home/Footer"

import { useContext } from "react"
import { ActorContext } from "../../contexts/actorContext"

const AdminMain = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <Footer/>
        </>
	)
}

export default AdminMain