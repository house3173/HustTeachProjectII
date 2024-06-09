import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import clock from '../../assets/images/clock.png'

import { Container, Row, Col, Button, Breadcrumb, Alert } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { ClassContext } from "../../contexts/classContext"
import convertRequire from '../../utils/convertRequire'
import convertTime from '../../utils/convertTime'
import { useNavigate } from 'react-router-dom'
import { ActorContext } from '../../contexts/actorContext'

const DetailClassSub = () => {

    const navigate = useNavigate()

    const currentClass = JSON.parse(localStorage.getItem('selectedClass'));
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    // const {classState, dispatch} = useContext(ClassContext)

    // const currentClass = classState.class
    const classSalary = currentClass.classFee * currentClass.classSession * 4 * 1000

    const [showAlert, setShowAlert] = useState(true);

    const {actorState, dispatch} = useContext(ActorContext)
    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
        setShowAlert(false);
    }

    let alertRegister

    const registerClass = () => {
        if(currentRoleActor === 'tutorMainHome') {
            navigate('/gia-su/dang-ky-lop')
            setShowAlert(false);
        } else if(currentRoleActor === 'parentsMainHome') {
            // setShowAlert(true);
            // alertRegister = (
            //     <Alert className='alert-css' show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
            //         <Alert.Heading>Bạn không thể đăng ký lớp!</Alert.Heading>
            //             <p>
            //             Chỉ gia sư mới có thể đăng ký lớp, do bạn là phụ huynh nên điều này là không thể!!!
            //             </p>
            //     </Alert>
            // )

        } else {
            // setShowAlert(true);
            // alertRegister = (
            //     <Alert className='alert-css' show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
            //         <Alert.Heading>Bạn cần đăng nhập với tư cách gia sư!</Alert.Heading>
            //             <p>
            //             Chỉ gia sư mới có thể đăng ký lớp, hãy đăng nhập với tư cách gia sư để đăng ký lớp này!!
            //             Click vào nút phía dưới để tiếp tục
            //             </p>
                    
            //             <div className="d-flex justify-content-end">
            //                 <Button onClick={() => setActorState('tutorLoginHome', '/dang-nhap')} variant="outline-success">
            //                     Đăng nhập tài khoản gia sư
            //                 </Button>
            //             </div>
            //     </Alert>

            // )
        }
        
    }

    return (
        <Container className="mt-30">
            <Breadcrumb>
                <Breadcrumb.Item href="#">*</Breadcrumb.Item>
                <Breadcrumb.Item href="/danh-sach-lop">
                    Danh sách lớp
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{`Chi tiết lớp ${currentClass.classId}`}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mb-20">
                <span className="listclass-title">{`Chi tiết lớp ${currentClass.classId}`}</span><br></br>
                <span className="listclass-title-sub">{`Tình trạng: ${currentClass.classStatus}`}</span>
            </div>

            <Row className='mb-30'>
                <Col xs={12} md={6} style={{paddingRight: '30px'}}>
                    <div className='mt-10'>
                        <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                        <span><strong>{`${currentClass.classSubject} - Lớp ${currentClass.classGrade}`}</strong></span>
                    </div>
                    <div className='mt-10'>
                        <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${currentClass.classAddress.addressDetail}, ${currentClass.classAddress.addressDistrict}, Hà Nội`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={dollar} alt='money' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${currentClass.classFee}K/buổi, ${currentClass.classSession} buổi/tuần`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={check} alt='require' width="20px" height="20px" className='mr-10'></img>
                        <span>{`Yêu cầu: ${convertRequire(currentClass.classRequire)}`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={clock} alt='time' width="20px" height="20px" className='mr-10'></img>
                        <span>{`Thời gian học: ${convertTime(currentClass.classTime)}`}</span>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div className='mt-10'><strong >Đặc điểm học sinh</strong></div>
                    <ul className='mt-10'>
                        <li className='mt-10'>{`Giới tính: ${currentClass.classStudent.studentGender}`}</li>
                        <li className='mt-10'>{`Học lực: ${currentClass.classStudent.studentLevel}`}</li>
                        <li className='mt-10'>{`Học sinh trường ${currentClass.classStudent.studentSchool}`}</li>
                        <li className='mt-10'>{`Mục tiêu: ${currentClass.classStudent.studentGoal}`}</li>
                        <li className='mt-10'>{`Thông tin bổ sung: ${currentClass.classStudent.studentAddInfo}`}</li>
                    </ul>
                    <div className='mt-10'>
                        <span><strong>{`Mức thu nhập:   ${classSalary} đồng / tháng`}</strong></span>
                    </div>
                    <div className='mt-10'>
                        <span><strong>{`Phí nhận lớp: ${currentClass.classPercentFee}%`}</strong> {` (chỉ nộp phí 1 lần cho tháng đầu tiên)`}</span>
                    </div>

                    <div className='mt-20 mb-10' style={{textAlign: "right"}}>
                        <Button style={{color: "white", backgroundColor:"#00b050", fontWeight: "600"}} onClick={() => registerClass()}>Đăng ký nhận lớp</Button>
                    </div>
                </Col>
            </Row>
            
            {/* {!showAlert && {alertRegister}} */}
            
        </Container>
    )
}
export default DetailClassSub