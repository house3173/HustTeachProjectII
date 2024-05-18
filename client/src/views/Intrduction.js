import Footer from "../components/home/Footer"
import NavbarMenu from "../components/home/NavbarMenu"
import Header from "../components/home/Header"
import IntroductionContent from "../components/home/IntroductionContent"

const Introduction = () => {
    return (
        <>
            <Header roleHeader = 'mainHome'></Header>
            <NavbarMenu></NavbarMenu>
            <IntroductionContent></IntroductionContent>
            <Footer/>
        </>
    )
}

export default Introduction