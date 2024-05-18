import { Container, Row, Col} from "react-bootstrap"
import location from '../../assets/images/location.png'
import phone from '../../assets/images/phone-green.png'
import mail from '../../assets/images/mail.png'
import facebook from '../../assets/images/facebook.png'
import youtube from '../../assets/images/youtube.png'
const Footer = () => {
    return (
        <div>
            <div className="home-footer">
                <Container>
                    <Row>
                        <Col xs={5}>
                            <span className="home-footer-span">Liên hệ với HustTeach</span>
                            <div className="home-footer-subitem">
                                <img src={location} alt="error" width="28px" height="28px" style={{marginRight: "10px"}}/>
                                <span>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
                            </div>
                            <div className="home-footer-subitem">
                                <img src={phone} alt="error" width="28px" height="28px" style={{marginRight: "10px"}}/>
                                <span>086-668-3956</span>
                            </div>
                            <div className="home-footer-subitem">
                                <img src={mail} alt="error" width="28px" height="28px" style={{marginRight: "10px"}}/>
                                <span>trinhvanhau@gmail.com</span>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <span className="home-footer-span">Về HustTeach</span>
                            <div className="home-footer-subitem">
                                <a href="/gioi-thieu">Giới thiệu</a>
                            </div>
                            <div className="home-footer-subitem">
                                <a>Chính sách</a>
                            </div>
                            
                        </Col>
                        <Col xs={5} style={{textAlign: "right"}}>
                            <span className="home-footer-span">Kết nối với HustTeach</span>
                            <div className="home-footer-subitem">
                                <a href="https://www.facebook.com/vanhau.trinh.121">Facebook của HustTeach</a>
                                <img src={facebook} alt="error" width="28px" height="28px" style={{marginLeft: "10px"}}/>
                            </div>
                            <div className="home-footer-subitem">
                                <a href="https://www.youtube.com/">Kênh Youtube của HustTeach</a>
                                <img src={youtube} alt="error" width="28px" height="28px" style={{marginLeft: "10px"}}/>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{display: "flex", justifyContent:"center", padding:"10px", backgroundColor: "#00b050", color:"white", fontWeight: "600"}}>
                HustTeach - Nơi kết nối tri thức
            </div>
        </div>
    )
}

export default Footer