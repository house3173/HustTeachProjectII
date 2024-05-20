import Footer from "../components/home/Footer"
import NavbarMenu from "../components/home/NavbarMenu"
import Header from "../components/home/Header"
import IntroductionContent from "../components/home/IntroductionContent"
import { useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'

const Introduction = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    return (
        <>
            {/* <Header roleHeader = 'mainHome'></Header> */}
            <Header roleHeader = {currentRoleActor}></Header>
            <NavbarMenu></NavbarMenu>
            <IntroductionContent></IntroductionContent>
            <Footer/>
        </>
    )
}

export default Introduction