import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import AccountManagement from "../../components/tutor/AccountManagement"
import Footer from "../../components/home/Footer"

import { useContext } from "react"
import { ActorContext } from "../../contexts/actorContext"
import AdminManageTutorTable from "../../components/admin/AdminManageTutorTable"
import AdminManageParentsTable from "../../components/admin/AdminManageParentsTable"

const AdminManageParents = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <AdminManageParentsTable/>
            <Footer/>
        </>
	)
}

export default AdminManageParents