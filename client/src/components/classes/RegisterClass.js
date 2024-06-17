import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import clock from '../../assets/images/clock.png'

import { Container, Row, Col, Button, Breadcrumb, Form, Modal } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import convertTime from '../../utils/convertTime'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { apiUrl } from '../../contexts/constants'

const RegisterClass = () => {
    const navi = useNavigate()

    const currentClass = JSON.parse(localStorage.getItem('selectedClass'));

    // const currentClass = classState.class
    const classSalary = currentClass.classFee * currentClass.classSession * 4 * 1000

    const classFeeRegister = classSalary * currentClass.classPercentFee / 100

    const [formData, setFormData] = useState({
        availableTime: '',
        currentLocation: '',
      });
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const handleCloseErrorModal = () => setShowErrorModal(false);
    const handleShowErrorModal = () => setShowErrorModal(true);
    const handleCloseSuccessModal = () => setShowSuccessModal(false);
    const handleShowSuccessModal = () => setShowSuccessModal(true);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
        const currentClass = JSON.parse(localStorage.getItem('selectedClass'));

        const waitRegisterClass = {
            "tutorId": currentTutor.tutorId,
            "classId": currentClass.classId,
            "parentsId": currentClass.parentsId,
            "timeFree": formData.availableTime,
            "address": formData.currentLocation,
            "status": 'Đang chờ',
            "reason": ''
        }

        console.log(waitRegisterClass)
        try {
            const response = await axios.post(`${apiUrl}/waitclass/registerClass`, waitRegisterClass);
            if(response.data.success) {
                handleShowSuccessModal()
            } else {
                handleShowErrorModal()
            }           
        } catch (error) {
            console.log(error);
        }
      };

      const classFeeStr =  currentClass.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')

    return (
        <>
        <Container className="mt-30">
            <Breadcrumb>
                <Breadcrumb.Item href="#">*</Breadcrumb.Item>
                <Breadcrumb.Item href="/danh-sach-lop">
                    Danh sách lớp
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/chi-tiet-lop">
                    {`Chi tiết lớp ${currentClass.classId}`}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{`Đăng ký lớp ${currentClass.classId}`}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="mb-20">
                <span className="listclass-title">{`Ghi chú nhận lớp ${currentClass.classId}`}</span><br></br>
                <span className="listclass-title-sub">{`Tình trạng: ${currentClass.classStatus}`}</span>
            </div>

            <Row className='mb-30'>
                <Col xs={12} md={6} style={{paddingRight: '30px'}}>
                    <div className='mt-10'>
                        <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                        <span><strong>{`${currentClass.classSubject} - ${currentClass.classGrade}`}</strong></span>
                    </div>
                    <div className='mt-10'>
                        <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${currentClass.classAddress.addressDetail}, ${currentClass.classAddress.addressDistrict}, Hà Nội`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={dollar} alt='money' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${classFeeStr}/buổi, ${currentClass.classSession} buổi/tuần`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={check} alt='require' width="20px" height="20px" className='mr-10'></img>
                        <span>{`Yêu cầu: ${currentClass.classRequireDetail.classRequireTypeTutor} - 
                                        ${currentClass.classRequireDetail.classRequireGender} - 
                                        ${currentClass.classRequireDetail.classRequireExper} năm kinh nghiệm `}
                        </span>
                    </div>
                    <div className='mt-10'>
                        <img src={clock} alt='time' width="20px" height="20px" className='mr-10'></img>
                        <span>{`Thời gian học: ${convertTime(currentClass.classTime)}`}</span>
                    </div>
                    
                    <div>
                        <div className='mt-10'><strong >{`Lớp ${currentClass.classId} có phí nhận lớp là ${classFeeRegister} đồng`}</strong></div>
                        <ol className='mt-10'>
                            <li>
                                Trung tâm sẽ liên hệ với phụ huynh. Nếu được chấp nhận:
                            </li>
                            <li>
                                {`Bạn sẽ chuyển khoản cho trung tâm số tiền: ${classFeeRegister} đồng`}
                            </li>
                            <li>
                                Trung tâm gửi hợp đồng và thông tin liên hệ của phụ huynh cho bạn qua email: trinhvanhau2003@gmail.com
                            </li>
                        </ol>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="availableTime">
                            <Form.Label><strong>Thời gian rảnh có thể đi dạy</strong></Form.Label>
                            <div></div>
                            <Form.Text className="text-muted mb-20" as="em">
                                Khung giờ:  <br></br>
                                Buổi sáng (8h-12h) ----  Buổi chiều (13h-18h) ----  Buổi tối (18h-22h) <br></br>
                                Ví dụ: Các buổi tối (18h-22h) thứ 2,4,6. Các buổi chiều (13h-18h) thứ 2 đến thứ 7. <br></br>
                                Buổi sáng (8h-12h) thứ 5. Cả ngày (8h-22h) CN <br></br>
                            </Form.Text>
                            <div className='mb-10'></div>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="availableTime"
                                value={formData.availableTime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="currentLocation">
                        <Form.Label className='mt-20'><strong>Nơi ở hiện tại</strong></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="currentLocation"
                            value={formData.currentLocation}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>

                        <Row className="justify-content-end">
                        <Col xs="auto">
                            <Button className = 'mt-20' variant="primary" type="submit">
                                Hoàn thành
                            </Button>
                        </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>

        <>
            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
            <Modal.Header closeButton>
                <Modal.Title>Lỗi đăng ký</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Bạn đã đăng ký lớp này trước đó. Hãy kiểm tra lại trong <a>Quản lý tài khoản</a>. <br></br>
                Và có thể đăng ký thêm các lớp mới! Cảm ơn bạn đã tin tưởng trung tâm!!</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={()=> {navi('/danh-sach-lop')}}>
                    Tìm thêm lớp mới
                </Button>
                <Button variant="primary" onClick={()=> {navi('/gia-su')}}>
                    Quản lý tài khoản
                </Button>
            </Modal.Footer>
            </Modal>
        </>

        <>
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
            <Modal.Header closeButton>
                <Modal.Title>Đăng ký thành công</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Bạn đã thành công đăng ký lớp mới. Yêu cầu của bạn sẽ được xử lý và chờ xác nhận từ trung tâm hoặc gia sư. <br></br>
                Bạn cũng có thể đăng ký thêm các lớp mới! Cảm ơn bạn đã tin tưởng trung tâm!!</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={()=> {navi('/danh-sach-lop')}}>
                    Tìm thêm lớp mới
                </Button>
                <Button variant="primary" onClick={()=> {navi('/gia-su')}}>
                    Quản lý tài khoản
                </Button>
            </Modal.Footer>
            </Modal>
        </>

        </>
    )
}
export default RegisterClass