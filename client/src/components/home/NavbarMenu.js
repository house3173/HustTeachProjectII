import { useContext } from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { ActorContext } from "../../contexts/actorContext"

const NavbarMenu = () => {

    const {actorState, dispatch} = useContext(ActorContext)

    const setActorState = (roleData) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
    }

    let navbarMenu 

    if(actorState.actor === 'mainHome' || actorState.actor === 'tutorLoginHome' || actorState.actor === 'parentsLoginHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/trang-chu" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/gioi-thieu" className="navbarmenu-item">Giới thiệu</Nav.Link>
                        <Nav.Link href="/" className="navbarmenu-item">Hướng dẫn</Nav.Link>
                        <Nav.Link href="/" className="navbarmenu-item">Chính sách</Nav.Link>
                        <Nav.Link href="/danh-sach-lop" className="navbarmenu-item">Danh sách lớp mới</Nav.Link>
                        <Nav.Link href="/danh-sach-lop-phu-hop" className="navbarmenu-item">Lớp phù hợp</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(actorState.actor === 'tutorMainHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/gia-su" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/gia-sư" className="navbarmenu-item">Hướng dẫn nhận lớp</Nav.Link>
                        <Nav.Link href="/gia-sư" className="navbarmenu-item">Hợp đồng mẫu</Nav.Link>
                        <Nav.Link href="/gia-sư" className="navbarmenu-item">Chính sách</Nav.Link>
                        <Nav.Link href="/danh-sach-lop" className="navbarmenu-item">Danh sách lớp mới</Nav.Link>
                        <Nav.Link href="/danh-sach-lop-phu-hop" className="navbarmenu-item">Lớp phù hợp</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(actorState.actor === 'parentsMainHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Thêm lớp mới</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Hợp đồng mẫu</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Chính sách</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Quản lý lớp</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Liên hệ trung tâm</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    return (
        <div>
            {navbarMenu}
        </div>
    )
}

export default NavbarMenu