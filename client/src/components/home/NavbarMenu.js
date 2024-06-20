import { useContext } from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { ActorContext } from "../../contexts/actorContext"

const NavbarMenu = () => {

    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));


    const setActorState = (roleData) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
    }

    let navbarMenu 

    if(currentRoleActor === 'mainHome' || currentRoleActor === 'tutorLoginHome' || currentRoleActor === 'parentsLoginHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/trang-chu" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/gioi-thieu" className="navbarmenu-item">Giới thiệu</Nav.Link>
                        <Nav.Link href="/huong-dan" className="navbarmenu-item">Hướng dẫn</Nav.Link>
                        <Nav.Link href="/danh-sach-lop" className="navbarmenu-item">Danh sách lớp mới</Nav.Link>
                        <Nav.Link href="/danh-sach-lop-phu-hop" className="navbarmenu-item">Lớp phù hợp</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(currentRoleActor === 'tutorMainHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/gia-su" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/huong-dan" className="navbarmenu-item">Hướng dẫn</Nav.Link>
                        <Nav.Link href="/danh-sach-lop" className="navbarmenu-item">Danh sách lớp mới</Nav.Link>
                        <Nav.Link href="/danh-sach-lop-phu-hop" className="navbarmenu-item">Lớp phù hợp</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(currentRoleActor === 'parentsMainHome') {
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/phu-huynh/them-lop-moi" className="navbarmenu-item">Thêm lớp mới</Nav.Link>
                        <Nav.Link href="/huong-dan" className="navbarmenu-item">Hướng dẫn</Nav.Link>
                        <Nav.Link href="/phu-huynh/quan-ly-lop" className="navbarmenu-item">Quản lý lớp</Nav.Link>
                        <Nav.Link href="/phu-huynh" className="navbarmenu-item">Liên hệ trung tâm</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(currentRoleActor === 'staffLogin' || currentRoleActor === 'staffMainHome') {

        const disabled = (currentRoleActor === 'staffLogin') ? true : false
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/staff31072003/trang-chu" disabled={disabled}  className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/staff31072003/quan-ly-lop" disabled={disabled}  className="navbarmenu-item">Quản lý lớp</Nav.Link>
                        <Nav.Link href="/staff31072003/them-lop-moi" disabled={disabled}  className="navbarmenu-item">Thêm lớp mới</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    if(currentRoleActor === 'adminLogin' || currentRoleActor === 'adminMainHome') {

        const disabled = (currentRoleActor === 'adminLogin') ? true : false
        navbarMenu = (
            <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "0.5px solid #646464"}}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin31072003/trang-chu" disabled={disabled}  className="navbarmenu-item">Trang chủ</Nav.Link>
                        <Nav.Link href="/admin31072003/quan-ly-lop" disabled={disabled}  className="navbarmenu-item">Quản lý lớp</Nav.Link>
                        <Nav.Link href="/admin31072003/quan-ly-nhan-vien" disabled={disabled}  className="navbarmenu-item">Quản lý nhân viên</Nav.Link>
                        <Nav.Link href="/admin31072003/quan-ly-gia-su" disabled={disabled}  className="navbarmenu-item">Quản lý gia sư</Nav.Link>
                        <Nav.Link href="/admin31072003/quan-ly-phu-huynh" disabled={disabled}  className="navbarmenu-item">Quản lý phụ huynh</Nav.Link>
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