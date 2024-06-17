import { Button, Container, Row, Col} from "react-bootstrap"
import camKetImg from '../../assets/images/cam-ket-tien-bo.svg'
import dayHieuQuaImg from '../../assets/images/phuong-phap-day-hieu-qua.svg'
import hocThuImg from '../../assets/images/hoc-thu-2-buoi.svg'
import { useContext } from 'react'
import { ActorContext } from '../../contexts/actorContext'
import { useNavigate } from 'react-router-dom'

const Introduce = () => {
    const navigate = useNavigate()

    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }

    let groupButton1 = (
        <>
            <Button variant="success" size="sm" className='home-introduce-btn' onClick={() => setActorState('tutorLoginHome', '/dang-nhap')}><strong>Đăng ký làm gia sư</strong></Button>
            <br></br>
            <Button variant="success" size="sm" className='home-introduce-btn' onClick={() => setActorState('parentsLoginHome', '/dang-nhap')}><strong>Đăng ký thuê gia sư</strong></Button>
        </>
    )
    let button2 = (
        <>
            <Button variant="success" size="sm" className='home-introduce-btn' style={{maxWidth: "200px", margin: "0 auto"}} onClick={() => setActorState('parentsLoginHome', '/dang-nhap')}>
                <strong>Đăng ký thuê gia sư</strong>
            </Button>
        </>
    )

    if(currentRoleActor === 'parentsMainHome') {
        groupButton1 = (
            <>
                <Button variant="success" size="sm" className='home-introduce-btn' style={{width: '70%', margin: '0 10px'}} href="/phu-huynh/them-lop-moi"><strong>Thêm lớp mới - Tìm gia sư ngay</strong></Button>
            </>
        )

        button2 = (
            <>
                <Button variant="success" size="sm" className='home-introduce-btn' style={{maxWidth: "200px", margin: "0 auto"}} href="/phu-huynh/them-lop-moi">
                    <strong>Thêm lớp mới - Tìm gia sư</strong>
                </Button>
            </>
        )

    } 

    return (
        <div>
            <div className="home-introduce">
                <div className="home-introduce-sub">
                    <h3 style={{textAlign: "center", color:"#00B050"}}>
                        Trung tâm gia sư HustTeach
                    </h3>
                    <p style={{textAlign: "justify", padding:"10px 0"}}>
                        Với sứ mệnh <span className="home-introduce-span">“Kết nối tri thức - Vì thế hệ tương lai của đất nước”</span>, 
                        trung tâm luôn giữ vững tinh thần làm việc <span className="home-introduce-span">Tậm tâm - Chân thành - Chất lượng - Uy tín</span>
                    </p>
                    {groupButton1}
                </div>
            </div>

            <div>
                <Container style={{marginTop: "30px", marginBottom: "30px"}}>
                    <h2 style={{textAlign: "center"}}> Tại sao chọn trung tâm gia sư HustTeach</h2>
                    <Row>
                        <Col xs style={{padding: "20px"}}>
                            <img src={dayHieuQuaImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Dạy hiệu quả</h4>
                            <p style={{textAlign: "justify"}}>
                                Con chỉ có thể học tốt nếu yêu thích việc học. 
                                Gia sư tại HustTeach luôn biết cách tạo động lực cho con, bằng các phương pháp giảng dạy thú vị, dễ hiểu và hiệu quả.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={camKetImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Tiến bộ nhanh</h4>
                            <p style={{textAlign: "justify"}}>
                                Với gia sư giỏi tại HustTeach, con bạn sẽ nhanh chóng học tập tiến bộ, 
                                có kết quả khác biệt chỉ sau 10 buổi học: Con chăm ngoan, học tốt hơn, điểm số cao hơn.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={hocThuImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Học thử hai buổi</h4>
                            <p style={{textAlign: "justify"}}>
                            Sau 2 buổi học thử đầu tiên, nếu không hài lòng về gia sư, 
                            bạn không cần phải thanh toán học phí. Tất nhiên, HustTeach luôn có những gia sư khiến bạn hài lòng nhất.
                            </p>
                        </Col>
                        
                    </Row>
                    {button2}
                </Container>
            </div>

            <div style={{backgroundColor: "#f7f7f7"}}>
                <Container style={{paddingTop: "30px", paddingBottom: "30px"}}>
                    <h2 style={{textAlign: "center"}}> Tại sao chọn trung tâm gia sư HustTeach</h2>
                    <Row>
                        <Col xs style={{padding: "20px"}}>
                            <img src={dayHieuQuaImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Dạy hiệu quả</h4>
                            <p style={{textAlign: "justify"}}>
                                Con chỉ có thể học tốt nếu yêu thích việc học. 
                                Gia sư tại HustTeach luôn biết cách tạo động lực cho con, bằng các phương pháp giảng dạy thú vị, dễ hiểu và hiệu quả.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={camKetImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Tiến bộ nhanh</h4>
                            <p style={{textAlign: "justify"}}>
                                Với gia sư giỏi tại HustTeach, con bạn sẽ nhanh chóng học tập tiến bộ, 
                                có kết quả khác biệt chỉ sau 10 buổi học: Con chăm ngoan, học tốt hơn, điểm số cao hơn.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={hocThuImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Học thử hai buổi</h4>
                            <p style={{textAlign: "justify"}}>
                            Sau 2 buổi học thử đầu tiên, nếu không hài lòng về gia sư, 
                            bạn không cần phải thanh toán học phí. Tất nhiên, HustTeach luôn có những gia sư khiến bạn hài lòng nhất.
                            </p>
                        </Col>
                        
                    </Row>
                    {button2}
                </Container>
            </div>

            <div>
                <Container style={{marginTop: "30px", marginBottom: "30px"}}>
                    <h2 style={{textAlign: "center"}}> Tại sao chọn trung tâm gia sư HustTeach</h2>
                    <Row>
                        <Col xs style={{padding: "20px"}}>
                            <img src={dayHieuQuaImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Dạy hiệu quả</h4>
                            <p style={{textAlign: "justify"}}>
                                Con chỉ có thể học tốt nếu yêu thích việc học. 
                                Gia sư tại HustTeach luôn biết cách tạo động lực cho con, bằng các phương pháp giảng dạy thú vị, dễ hiểu và hiệu quả.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={camKetImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Tiến bộ nhanh</h4>
                            <p style={{textAlign: "justify"}}>
                                Với gia sư giỏi tại HustTeach, con bạn sẽ nhanh chóng học tập tiến bộ, 
                                có kết quả khác biệt chỉ sau 10 buổi học: Con chăm ngoan, học tốt hơn, điểm số cao hơn.
                            </p>
                        </Col>
                        <Col xs style={{padding: "20px"}}>
                            <img src={hocThuImg} alt="erorr" style={{width: "50px", height: "50px", textAlign: "left", margin: "20px 0"}}/>
                            <h4 style={{marginBottom: "15px"}}>Học thử hai buổi</h4>
                            <p style={{textAlign: "justify"}}>
                            Sau 2 buổi học thử đầu tiên, nếu không hài lòng về gia sư, 
                            bạn không cần phải thanh toán học phí. Tất nhiên, HustTeach luôn có những gia sư khiến bạn hài lòng nhất.
                            </p>
                        </Col>
                        
                    </Row>
                    {button2}
                </Container>
            </div>
        </div>
    )
}

export default Introduce