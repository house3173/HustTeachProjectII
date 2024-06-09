import Header from '../../components/home/Header'
import NavbarMenu from '../../components/home/NavbarMenu'
import Footer from '../../components/home/Footer'
import { useContext } from 'react'
import { ActorContext } from '../../contexts/actorContext'
import RegisterClass from '../../components/classes/RegisterClass'

const TutorRegisterClass = () => {
    const {actorState, dispatch} = useContext(ActorContext)

    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            {/* <Header roleHeader = 'mainHome'/> */}
            <NavbarMenu/>
            <RegisterClass/>
            <Footer/>
        </>
    )
}

export default TutorRegisterClass