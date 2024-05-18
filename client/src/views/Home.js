import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Introduce from '../components/home/Introduce'
import Footer from '../components/home/Footer'

const Home = () => {
	return (
        <>
            <Header roleHeader = 'mainHome'/>
            <NavbarMenu/>
            <Introduce/>
            <Footer/>
        </>
	)
}

export default Home