import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import Introduce from "../../components/home/Introduce"
import Footer from "../../components/home/Footer"

import { useContext } from "react"
import { ActorContext } from "../../contexts/actorContext"
import ManagementClassesParents from "../../components/classes/ManagementClassesParents"

const ParentsManageClass = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));
    const currentParents = JSON.parse(localStorage.getItem('currentParents'));
    console.log(currentParents)
    console.log(currentParents.parentsId)
	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <ManagementClassesParents parentsId = {currentParents.parentsId}/>
            <Footer/>
        </>
	)
}

export default ParentsManageClass