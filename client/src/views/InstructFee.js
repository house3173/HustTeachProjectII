import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Introduce from '../components/home/Introduce'
import Footer from '../components/home/Footer'
import {useContext, useEffect } from 'react'
import { ActorContext } from '../contexts/actorContext'
import Instruct from '../components/home/Instruct'

const InstructFee = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    console.log(actorState.actor)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));
    if(!currentRoleActor) {
        localStorage.setItem('actorState', JSON.stringify("mainHome"));
    }
    // useEffect(() => localStorage.setItem('actorState', JSON.stringify("mainHome")), [])
	// return (
    const currentRoleActorNew = JSON.parse(localStorage.getItem('actorState'));
    return (
        <>
            <Header roleHeader = {currentRoleActorNew}/>
            <NavbarMenu/>
            <Instruct />
            <Footer/>
        </>
	)
}

export default InstructFee