import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Introduce from '../components/home/Introduce'
import Footer from '../components/home/Footer'
import {useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'

const Home = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));
    if(!currentRoleActor) {
        localStorage.setItem('actorState', JSON.stringify("mainHome"));
    }
	return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <Introduce/>
            <Footer/>
        </>
	)
}

export default Home