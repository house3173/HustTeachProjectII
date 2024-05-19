import { Navbar, Nav, Container } from "react-bootstrap"

const NavbarMenu = () => {
    return (
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
                    <Nav.Link href="/" className="navbarmenu-item">Lớp phù hợp</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu