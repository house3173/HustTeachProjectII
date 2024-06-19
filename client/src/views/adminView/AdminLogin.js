import Header from "../../components/home/Header"
import NavbarMenu from "../../components/home/NavbarMenu"
import { useContext, useEffect } from "react"
import { ActorContext } from "../../contexts/actorContext"
import Footer from "../../components/home/Footer"
import AdminLoginForm from "../../components/admin/AdminLoginForm"

const AdminLogin = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    useEffect(() => {
        console.log('admin login')
        dispatch({type: "RESET_ACTOR", payload : "adminLogin"})
    }, [])
    // console.log(actorState.actor)
    // const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

	return (
        <>
            <Header roleHeader = {'adminLogin'}/>
            <NavbarMenu/>
            <AdminLoginForm/>
            <Footer/>
        </>
	)
}

export default AdminLogin