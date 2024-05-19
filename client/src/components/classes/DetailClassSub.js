import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import clock from '../../assets/images/clock.png'

import { Container, Row, Col, Button } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { ClassContext } from "../../contexts/classContext"
import convertRequire from '../../utils/convertRequire'
import convertTime from '../../utils/convertTime'

const DetailClassSub = () => {

    const currentClass = JSON.parse(localStorage.getItem('selectedClass'));

    // const {classState, dispatch} = useContext(ClassContext)

    // const currentClass = classState.class
    const classSalary = currentClass.classFee * currentClass.classSession * 4 * 1000

    const registerClass = () => {

    }

    return (
        <Container className="mt-30">
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
                        <Button style={{color: "white", backgroundColor:"#00b050", fontWeight: "600"}} onClick={registerClass}>Đăng ký nhận lớp</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default DetailClassSub