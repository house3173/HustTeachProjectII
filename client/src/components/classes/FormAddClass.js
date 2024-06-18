import { Container, Row, Col, Form, Button, FloatingLabel, Modal } from "react-bootstrap"
import { useState, useEffect, useContext } from "react";
import { apiUrl } from "../../contexts/constants";
import convertRequire from '../../utils/convertRequire'
import convertTime from '../../utils/convertTime'
import { ClassContext } from "../../contexts/classContext";
import axios from "axios";

import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import clock from '../../assets/images/clock.png'
import { useNavigate } from "react-router-dom";

const FormAddClass = () => {
    const {classState, dispatch} = useContext(ClassContext)

    const navi = useNavigate()

    const initFormData = {
        // classId: 'L5363',
        // classStatus: 'Đang còn',
        classSubject: '',
        classGrade: '',
        classAddress: {
            addressDistrict: '',
            addressDetail: ''
        },
        classFee: [200],
        classFeeBonus: '',
        classHour: '',
        classSession: '',
        classRequireDetail: {
            classRequireTypeTutor: '',
            classRequireGender: '',
            classRequireExper: ''
        },
        parentsId: '',
        parentsPhone: '',
        tutorId: '',
        staffId: '',
        classPercentFee: '30',
        classTime: {
            timeMoring: '',
            timeAfternoon: '',
            timeEvening: '',
            timeDay: ''
        },
        classStudent: {
            studentGender: '',
            studentLevel: '',
            studentSchool: '',
            studentGoal: '',
            studentAddInfo: '',
        },
        addBy: 'PH'
    };

    let currentClass = JSON.parse(localStorage.getItem('selectedClass'))
    const actorState = JSON.parse(localStorage.getItem('actorState'))
    
    const [formData, setFormData] = useState(initFormData);
    const [classFeeStr, setClassFeeStr] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [subjects, setSubjects] = useState(['Math', 'Physics', 'Chemistry', 'Biology', 'English']);
    const [subjectFees, setSubjectFees] = useState([]);
    const [subjectFeesTutor, setSubjectFeesTutor] = useState([]);
    const [listParents, setListParents] = useState([])

    const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
    const districts = ['Thanh Xuân', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hà Đông', 'Hoàn Kiếm', 'Ba Đình', 'Tây Hồ', 'Long Biên'];

    useEffect(() => {
        axios.get(`${apiUrl}/subject/getAll`)
            .then(response => {
                if(response.data.success) {
                  const subjectNames = response.data.subjects.map(subject => subject.subjectName);
                  const subjectFees = response.data.subjects.map(subject => subject.subjectFee);
                  setSubjects(subjectNames);
                  setSubjectFees(subjectFees);
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
        
        if(actorState === 'staffMainHome') {
            axios.get(`${apiUrl}/parents/getAll`)
                .then(response => {
                    if(response.data.success) {
                        const listParentsInfo = response.data.parentsList.map(parents => 
                            ({"parentsId" : parents.parentsId, "parentsName" : parents.parentsName}));
                        setListParents(listParentsInfo)
                        console.log(listParents)
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }
    }, []);

    useEffect(() => {}, [currentClass])

    const caculateClassFee = (e) => {
        e.preventDefault();

        // get subject fee
        const subjectFeeList = subjectFees.filter(function(subjectFee, index) {
            return subjects[index] === formData.classSubject;
        });

        let subjectFee = '50'
        if(subjectFeeList) subjectFee = subjectFeeList[0];
        subjectFee = Number(subjectFee)

        // get grade fee
        let gradeItem = formData.classGrade

        let gradeFee;
        if (grades.indexOf(gradeItem) <= grades.indexOf('Lớp 5')) {
            gradeFee = 10;
        } else if (grades.indexOf(gradeItem) <= grades.indexOf('Lớp 9')) {
            gradeFee = 20;
        } else {
            gradeFee = 30;
        }

        // get time fee
        let timeFee = Number(formData.classHour) * 10

        // get bonus fee
        let bonusFee = 0 ? !formData.classFeeBonus : Number(formData.classFeeBonus)

        // get experience fee
        let experFee = Number(formData.classRequireDetail.classRequireExper) * 20

        //caculate fee for Sinh vien va Giao vien
        const SVFee = (50 + subjectFee + gradeFee + timeFee + bonusFee + experFee) / 2 * Number(formData.classHour) ;       
        const GVFee = (200 + subjectFee + gradeFee + timeFee + bonusFee + experFee) / 2 * Number(formData.classHour) ;   
        
        console.log(SVFee, GVFee, [SVFee], [GVFee], [SVFee, GVFee])
        if(formData.classRequireDetail.classRequireTypeTutor === 'Sinh viên') {
            setFormData(prevState => ({
                ...prevState,
                classFee: [SVFee]
            }));

            const classFeeString = formData.classFee.map(fee => (fee*1000).toString() + ' đồng').join(' hoặc ')
            const classFeeTutorString = formData.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')
            console.log(classFeeString)
            setClassFeeStr(classFeeString)
            setSubjectFeesTutor(classFeeTutorString)
        }

        if(formData.classRequireDetail.classRequireTypeTutor === 'Giáo viên') {
            setFormData(prevState => ({
                ...prevState,
                classFee: [GVFee]
            }));

            const classFeeString = formData.classFee.map(fee => (fee*1000).toString() + ' đồng').join(' hoặc ')
            const classFeeTutorString = formData.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')
            console.log(classFeeString)
            setClassFeeStr(classFeeString)
            setSubjectFeesTutor(classFeeTutorString)
        }
        
        if(formData.classRequireDetail.classRequireTypeTutor === 'SV/GV') {
            setFormData(prevState => ({
                ...prevState,
                classFee: [SVFee, GVFee] 
            }));

            const classFeeString = formData.classFee.map(fee => (fee*1000).toString() + ' đồng').join(' hoặc ')
            const classFeeTutorString = formData.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')
            console.log(classFeeString)
            setClassFeeStr(classFeeString)
            setSubjectFeesTutor(classFeeTutorString)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the field name is nested within another object
        const nameParts = name.split('.');
        if (nameParts.length === 1) {
            // If the field name is not nested
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // If the field name is nested
            setFormData(prevState => {
                let updatedData = { ...prevState };

                updatedData[nameParts[0]][nameParts[1]] = value;

                return updatedData;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const currentParents = JSON.parse(localStorage.getItem('currentParents'));
        const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));
        let classData
        if(actorState === 'staffMainHome') {
            classData = {
                ...formData,
                'staffId': currentStaff.staffId,
                'addBy': 'NV'
            }
        } else if (actorState === 'parentsMainHome') {
            classData = {
                ...formData,
                'parentsId': currentParents.parentsId
            }
        }
        
        try {
            const response = await axios.post(`${apiUrl}/classes/addClass`, classData);
            currentClass = response.data.newClass;
            dispatch({type: "DETAIL_CLASS", payload: currentClass})
            handleShow()
            console.log('Form saved:', response.data);
        } catch (error) {
            console.error('Error saving form:', error);
        }
    }

    return (
        <>
        <Container className="mt-30">
            <Form onSubmit={handleSubmit}>
                <Row className="mt-3">
                    <Col md={6} xs={12}>
                        <div className="mb-20">
                            <span className="listclass-title" style={{fontSize: '24px'}}>Thêm lớp học mới</span>
                        </div>
                        
                        <p><b>Thông tin phụ huynh</b></p>
                        {(actorState === 'staffMainHome') &&
                        <Row className="mt-3 mb-3">
                                {/* 1 */}
                                <Col>
                                    <Form.Select 
                                        name="parentsId"
                                        value={formData.parentsId}
                                        onChange={handleChange}
                                        required
                                        placeholder='Chọn phụ huynh'
                                    >
                                        <option value="Chọn phụ huynh">Chọn phụ huynh</option>
                                        {listParents.map((parents, index) => (
                                            <option key={index} value={parents.parentsId}>{`${parents.parentsId} - ${parents.parentsName}`}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                        </Row>
                        }
                        <Row className="mt-3 mb-3">
                                <Col>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Số điện thoại liên hệ" 
                                        name="parentsPhone"
                                        value={formData.parentsPhone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                        </Row>
    
                        <p><b>Thông tin lớp học</b></p>
                        <Row className="mt-3">
                            {/* 1 */}
                            <Col>
                                <Form.Select 
                                    name="classSubject"
                                    value={formData.classSubject}
                                    onChange={handleChange}
                                    required
                                    placeholder='Chọn môn'
                                >
                                    <option value="Chọn môn">Chọn môn</option>
                                    {subjects.map((subject, index) => (
                                        <option key={index} value={subject}>{subject}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            {/* 2 */}
                            <Col>
                                <Form.Select 
                                    name="classGrade"
                                    value={formData.classGrade}
                                    onChange={handleChange}
                                    required
                                    placeholder='Chọn lớp'
                                >
                                    <option value="Chọn môn">Chọn môn</option>
                                    {grades.map((grade, index) => (
                                        <option key={index} value={grade}>{grade}</option>
                                    ))}

                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            {/* 3 */}
                            <Col>
                                <Form.Select 
                                    name="classAddress.addressDistrict"
                                    value={formData.classAddress.addressDistrict}
                                    onChange={handleChange}
                                    required
                                    placeholder='Chọn quận'
                                >
                                    <option value="Chọn quận">Chọn quận</option>
                                    {districts.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            {/* 4 */}
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập địa chỉ chi tiết" 
                                    name="classAddress.addressDetail"
                                    value={formData.classAddress.addressDetail}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            {/* 5 */}
                            <p className="mt-3"><b>Yêu cầu</b></p>
                            <Col>
                                <Form.Select 
                                    name="classRequireDetail.classRequireTypeTutor"
                                    value={formData.classRequireDetail.classRequireTypeTutor}
                                    onChange={handleChange}
                                    required
                                    placeholder='Gia sư là:'
                                >
                                    <option value="Gia sư là:">Gia sư là:</option>
                                    <option value="Sinh viên">Sinh viên</option>
                                    <option value="Giáo viên">Giáo viên</option>
                                    <option value="SV/GV">Cả hai</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                    <Form.Select 
                                        name="classRequireDetail.classRequireGender"
                                        value={formData.classRequireDetail.classRequireGender}
                                        onChange={handleChange}
                                        required
                                        placeholder='Giới tính'
                                    >
                                        <option value="Giới tính">Giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Cả hai">Cả hai</option>
                                    </Form.Select>
                            </Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Năm KN" 
                                    name="classRequireDetail.classRequireExper"
                                    value={formData.classRequireDetail.classRequireExper}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            {/* 6 */}
                            <p className="mt-3"><b>Thời gian có thể học:</b></p>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Số giờ học/buổi"
                                    name="classHour"
                                    value={formData.classHour}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Số buổi học"
                                    name="classSession"
                                    value={formData.classSession}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        {/* 7 */}
                        <Row className="mt-3 ml-10">
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Buổi sáng</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="VD: 2,3,5" 
                                        name="classTime.timeMoring"
                                        value={formData.classTime.timeMoring}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Buổi chiều</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="VD: 2,3,5" 
                                        name="classTime.timeAfternoon"
                                        value={formData.classTime.timeAfternoon}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="ml-3 ml-10">
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Buổi tối</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="VD: 2,3,5" 
                                        name="classTime.timeEvening"
                                        value={formData.classTime.timeEvening}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cả ngày</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="VD: 2,3,5" 
                                        name="classTime.timeDay"
                                        value={formData.classTime.timeDay}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            {/* 8 */}
                            <p><b>Chi phí buổi học</b></p>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Phí bổ sung - nếu có (x10000)"
                                    name="classFeeBonus"
                                    value={formData.classFeeBonus}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <p>
                                    {`Phí gia sư tối thiểu cho 1 buổi học với yêu cầu trên là ${classFeeStr}`}
                                </p>
                                <div className='mt-20 mb-10' style={{textAlign: "center"}}>
                                    <Button type="submit" onClick={caculateClassFee} style={{color: "white", backgroundColor:"#00b050", fontWeight: "600", fontSize: '12px'}}>Tính phí buổi học</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={6} xs={12} className="mt-40">
                        <Row className="mt-3">
                            {/* 1 */}
                            <p><b>Đặc điểm học sinh</b></p>
                            <Col>
                                <Form.Select 
                                    name="classStudent.studentGender"
                                    value={formData.classStudent.studentGender}
                                    onChange={handleChange}
                                    required
                                    placeholder='Giới tính'
                                >
                                    <option value="Giới tính">Giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </Form.Select>
                            </Col>
                            {/* 2 */}
                            <Col>
                                <Form.Select 
                                    name="classStudent.studentLevel"
                                    value={formData.classStudent.studentLevel}
                                    onChange={handleChange}
                                    required
                                    placeholder='Học lực'
                                >
                                    <option value="Học lực">Học lực</option>
                                    <option value="Trung bình">Trung bình</option>
                                    <option value="Khá">Khá</option>
                                    <option value="Giỏi">Giỏi</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <FloatingLabel className="mb-3 mt-3" label="Nhập thông tin trường lớp" >
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập thông tin trường lớp" 
                                name="classStudent.studentSchool"
                                value={formData.classStudent.studentSchool}
                                onChange={handleChange}
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" label="Nguyện vọng">
                            <Form.Control 
                                style={{minHeight: '100px'}}
                                as="textarea" 
                                type="textarea" 
                                placeholder="Nguyện vọng" 
                                name="classStudent.studentGoal"
                                value={formData.classStudent.studentGoal}
                                onChange={handleChange}
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3"  label="Thông tin khác (bổ sung)" >
                            <Form.Control 
                                style={{minHeight: '100px'}}
                                as="textarea"
                                type="textarea" 
                                placeholder="Thông tin khác (bổ sung)" 
                                name="classStudent.studentAddInfo"
                                value={formData.classStudent.studentAddInfo}
                                onChange={handleChange}
                            />
                        </FloatingLabel>


                        <Row>
                            <Col md={4} xs={6}>
                                <p><b>Phí trả gia sư:</b></p>
                            </Col>
                            <Col md={8} xs={6}>
                                <p><b>{`${subjectFeesTutor} / tháng`}</b></p>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={4} xs={6}>
                                <p><b>Phí trả trung tâm:</b></p>
                            </Col>
                            <Col md={8} xs={6}>
                                <p><b>100.000 đồng</b></p>
                            </Col>
                        </Row>

                        <div className='mt-20 mb-10' style={{textAlign: "right"}}>
                            <Button type="submit" style={{color: "white", backgroundColor:"#00b050", fontWeight: "600"}}>Xác nhận thêm lớp</Button>
                        </div>
                    </Col>
                </Row>
                
            </Form>

        </Container>

        <>
            {/* <Button variant="primary" onClick={handleShow}>
            Launch modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đã gửi yêu cầu thêm lớp mới!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* {currentClass && <div>Tesst</div>} */}
                {currentClass && 
                <div>
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
                    <div style={{marginTop: "20px"}}>
                        <p> HustTeach sẽ xem xét thông tin và liên hệ lại để xác nhận với bạn. 
                            Khi xác nhận thành công, bạn sẽ chuyển phí tìm gia sư và 
                            trung tâm tiến hành đưa thông tin lớp học tới các gia sư.
                        </p>
                    </div>
                </div>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={()=> {navi('/phu-huynh/quan-ly-lop')}}>
                Quản lý lớp
                </Button>
            </Modal.Footer>
            </Modal>
        </>
        </>
    )
}

export default FormAddClass