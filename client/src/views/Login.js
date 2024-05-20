import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Introduce from '../components/home/Introduce'
import Footer from '../components/home/Footer'
import {useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'
import LoginForm from '../components/home/LoginForm'

const Login = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    console.log(actorState.actor)
	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <LoginForm/>
            <Footer/>
        </>
	)
}

export default Login