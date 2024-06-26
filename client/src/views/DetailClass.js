import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Footer from '../components/home/Footer'
import DetailClassSub from '../components/classes/DetailClassSub'
import { useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'

const DetailClass = () => {
    const {actorState, dispatch} = useContext(ActorContext)

    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    return (
        <>
            <Header roleHeader = {currentRoleActor}/>
            {/* <Header roleHeader = 'mainHome'/> */}
            <NavbarMenu/>
            <DetailClassSub/>
            <Footer/>
        </>
    )
}

export default DetailClass