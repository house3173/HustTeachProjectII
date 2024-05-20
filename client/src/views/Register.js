import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Introduce from '../components/home/Introduce'
import Footer from '../components/home/Footer'
import {useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'
import RegisterForm from '../components/home/RegisterForm'

const Register = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    console.log(actorState.actor)
	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <RegisterForm/>
            <Footer/>
        </>
	)
}

export default Register