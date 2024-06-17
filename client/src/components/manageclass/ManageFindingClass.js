import { useEffect, useState } from "react"
import { Container, Modal, Button, Table, Col, Row, ProgressBar, Form, FloatingLabel } from "react-bootstrap"
import axios from "axios"

import { apiUrl } from "../../contexts/constants"

const ManageFindingClass = ({currentClass, controlChild, reRenderParents}) => {
    const listAchi = [
        { id: 1, label: 'Có môn đạt 9 điểm trở lên khi thi Đại học' },
        { id: 2, label: 'Cấp 3 theo học trường chuyên' },
        { id: 3, label: 'Đạt giải tại các kỳ thi cấp tỉnh và khu vực' },
        { id: 4, label: 'Đạt giải tại các kỳ thi cấp quốc gia, quốc tế' },
        { id: 5, label: 'Có chứng chỉ quốc tế' },
        { id: 6, label: 'Từng đạt học bổng đại học' },
        { id: 7, label: 'Giảng dạy tại trường chuẩn quốc gia' },
        { id: 8, label: 'Có kinh nghiệm gia sư trước đây' }
    ];

    const [listTutorInfo, setListTutorInfo] = useState([])
    const [listWaitClass, setListWaitClass] = useState([])
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [showModalRefuse, setShowModalRefuse] = useState(false);
    const [showModalAgree, setShowModalAgree] = useState(false);
    const [reRender, setReRender] = useState(controlChild)
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [tutorAchi, setTutorAchi] = useState(null)
    const [tutorEvalute, setTutorEvalute] = useState(null)
    const [reasonRefuse, setReasonRefuse] = useState('')
    const achievements = tutorAchi ? listAchi.filter((item, index) => tutorAchi[`tutorAchi${item.id}`]) : [];


    useEffect(() => {
        axios.get(`${apiUrl}/waitclass/getAllByClassId/${currentClass.classId}`)
            .then(response => {
                if(response.data.success) {
                    setListTutorInfo(response.data.tutorWaitInfo)
                    setListWaitClass(response.data.tutorWaitClasses)
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [reRender, currentClass.classId])

    useEffect(() => {
        if (selectedTutor) {
            const fetchTutorData = async () => {
              try {
                const achiResponse = await axios.get(`${apiUrl}/tutor/getAchievement/${selectedTutor.tutorId}`);
                if(achiResponse.data.success) 
                    setTutorAchi(achiResponse.data.existingTutorAchi);
        
                const evaluteResponse = await axios.get(`${apiUrl}/evalutetutor/getEvaluteByTutorId/${selectedTutor.tutorId}`);
                if(evaluteResponse.data.success)
                    setTutorEvalute(evaluteResponse.data.evaluteTutorListWithParents);
              } catch (error) {
                console.error('Error fetching tutor data:', error);
              }
            };
        
            fetchTutorData();
        }
    }, [selectedTutor])

    const handleCloseModalRefuse = () => setShowModalRefuse(false)
    const handleCloseModalAgree = () => setShowModalAgree(false)
    const handleOpenModalAgree = () => setShowModalAgree(true)

    const handleInfoClick = (tutor) => {
        setSelectedTutor(tutor);
        setShowModalInfo(true);
    };
    const handleRefuseClick = (tutor) => {
        setSelectedTutor(tutor);
        setShowModalRefuse(true);
    };

    const handleChangeRefuse = (e) => {
        setReasonRefuse(e.target.value)
    }

    const handleSubmitRefuse = async (e) => {
        const refuseData = {
            "tutorId": selectedTutor.tutorId,
            "classId": currentClass.classId,
            "status": "Từ chối",
            "reason": reasonRefuse
        } 
        console.log(refuseData);

        try {
            const response = await axios.post(`${apiUrl}/waitclass/updateWaitClass`, refuseData);
            if(response.data.success) {
                handleCloseModalRefuse()
                setSelectedTutor(null)
                setReRender(!reRender)
            } else {
               
            }           
        } catch (error) {
            console.log(error);
        }
    };

    const handleConfirmClick = (tutor) => {
        setSelectedTutor(tutor);
        setShowModalAgree(true);
    };

    const handleConfirmTutor = async () => {
        const confirmData = {
            "tutorId": selectedTutor.tutorId,
            "classId": currentClass.classId
        }

        try {
            const response = await axios.post(`${apiUrl}/waitclass/confirmTutor`, confirmData);
            if(response.data.success) {
                handleCloseModalAgree()
                reRenderParents(!reRender)
                setReRender(!reRender)
            } else {
                
            }           
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <div className="mt-20">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tên gia sư</th>
                            <th className="center-th">Xem thông tin gia sư</th>
                            <th className="center-th">Từ chối yêu cầu</th>
                            <th className="center-th">Xác nhận gia sư</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTutorInfo.map((tutor) => (
                            <tr key={tutor.tutorId}>
                                <td>{`Gia sư ${tutor.tutorName}`}</td>
                                <td className="center-td">
                                    <Button
                                        variant="warning"
                                        style={{ backgroundColor: '#FFC000', borderRadius: '50%', marginRight: '10px', color: 'white', padding: '6px 16px 8px 16px'}}
                                        onClick={() => handleInfoClick(tutor)}
                                    >
                                        <strong>i</strong>
                                    </Button>
                                </td>
                                <td className="center-td">
                                    <Button
                                        variant="danger"
                                        style={{ borderRadius: '50%', marginRight: '10px' , padding: '4px 15px 10px 15px'}}
                                        onClick={() => handleRefuseClick(tutor)}
                                    >
                                        <strong>x</strong>
                                    </Button>
                                </td>
                                <td className="center-td">
                                    <Button
                                        variant="success"
                                        style={{ backgroundColor: '#00b050', borderRadius: '50%' }}
                                        onClick={() => handleConfirmClick(tutor)}
                                    >
                                        ✔
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModalInfo} onHide={() => setShowModalInfo(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>{`Thông tin gia sư`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedTutor && (
                            <div>
                                <div>
                                    <p><strong>Thông tin cơ bản</strong></p>
                                    <Container>
                                        <Row>
                                            <Col><p>{`Họ và tên: ${selectedTutor.tutorName}`}</p></Col>
                                            <Col><p>{`Giới tính: ${selectedTutor.tutorGender}`}</p></Col>
                                        </Row>
                                        <Row>
                                            <Col><p>{`Năm sinh: ${selectedTutor.tutorYear}`}</p></Col>
                                            <Col><p>{`Hiện đang là: ${selectedTutor.tutorType}`}</p></Col>
                                        </Row>
                                        <Row>
                                            <Col><p>{`Đại học: ${selectedTutor.tutorUni}`}</p></Col>
                                            <Col><p>{`Chuyên ngành: ${selectedTutor.tutorMajor}`}</p></Col>
                                        </Row>
                                        <Row>
                                            <Col><p>{`Thời gian bắt đầu học: ${selectedTutor.tutorStart}`}</p></Col>
                                            <Col><p>{`Thời gian kết thúc học: ${selectedTutor.tutorEnd}`}</p></Col>
                                        </Row>
                                    </Container>
                                </div>
                                <div>
                                    <p><strong>Thành tích của gia sư</strong></p>
                                    <Container>
                                        {(achievements.length !== 0) &&
                                            <div>
                                                <ul>
                                                    {achievements.map((item) => (
                                                        <li key={item.id} className="mt-10">
                                                            <span>{item.label}:</span>
                                                            <span className="ml-10">{tutorAchi[`tutorAchi${item.id}`]}</span>
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        }
                                    </Container>
                                </div>
                                <div>
                                    <p><strong>Các đánh giá từ phụ huynh trước đây</strong></p>
                                    <Container>
                                        {tutorEvalute && 
                                            <div>
                                                {tutorEvalute.map((evaluteItem, index) => (
                                                    <div key={index}>
                                                        <div className="mb-10 mt-20">
                                                            <span style={{color: '#156082'}}><strong>{`Từ phụ huynh ${evaluteItem.parentsName}`}</strong></span>
                                                        </div>
                                                        <ProgressBar style={{minHeight: '20px'}} animated  now={Number(evaluteItem.tutorGrade)} label={`${Number(evaluteItem.tutorGrade)}/100`} />
                                                        <div className="mt-10" style={{ padding: '20px', borderRadius: '10px', backgroundColor: "rgb(189, 227, 244)"}}>
                                                            <pre>{evaluteItem.feedBack}</pre>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </Container>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalInfo(false)}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalRefuse} onHide={() => setShowModalRefuse(false)}>
                            <Modal.Header closeButton>
                                {selectedTutor &&
                                    <Modal.Title>{`Từ chối yêu cầu gia sư ${selectedTutor.tutorName}`}</Modal.Title>
                                }
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Lý do từ chối</strong></p>
                                <Form>
                                    <FloatingLabel controlId="floatingDate" label="Lý do từ chối" className="mb-3">
                                        <Form.Control 
                                            as="textarea" 
                                            rows={5}
                                            name="reasonRefuse" 
                                            value={reasonRefuse} 
                                            onChange={handleChangeRefuse} 
                                            required
                                        />
                                    </FloatingLabel>

                                    <div style={{textAlign: 'right'}}>
                                        <Button variant="danger" type="button" onClick={handleSubmitRefuse}>
                                            Xác nhận từ chối gia sư
                                        </Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                </Modal>

                <Modal show={showModalAgree} onHide={handleCloseModalAgree}>
                            <Modal.Header closeButton>
                                {selectedTutor &&
                                    <Modal.Title>{`Xác nhận gia sư ${selectedTutor.tutorName}`}</Modal.Title>
                                }
                            </Modal.Header>
                            <Modal.Body>
                                {selectedTutor && 
                                    <p><strong>{`Xác nhận giao lớp ${currentClass.classId} cho gia sư ${selectedTutor.tutorName}`} </strong></p>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModalAgree}>Close</Button>
                                <Button variant="primary" onClick={handleConfirmTutor}>Xác nhận</Button>
                            </Modal.Footer>
                </Modal>
                </div>

        </Container>
    )
}

export default ManageFindingClass