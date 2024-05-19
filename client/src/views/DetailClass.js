import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Footer from '../components/home/Footer'
import DetailClassSub from '../components/classes/DetailClassSub'

const DetailClass = () => {
    return (
        <>
            <Header roleHeader = 'mainHome'/>
            <NavbarMenu/>
            <DetailClassSub/>
            <Footer/>
        </>
    )
}

export default DetailClass