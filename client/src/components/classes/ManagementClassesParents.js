import play from '../../assets/images/play.png'
import openbook from '../../assets/images/open-book.png'
import hand from '../../assets/images/tap.png'
import teach from '../../assets/images/innovation.png'


import { apiUrl } from '../../contexts/constants';
import convertTime from '../../utils/convertTime'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Row, Toast, Form, Button, Modal, ToastContainer, FloatingLabel, ProgressBar } from 'react-bootstrap';
import ClassInfoCard from './ClassInfoCard'
import convertDate from '../../utils/convertDate'
import ManageFindingClass from '../manageclass/ManageFindingClass';

const ManagementClassesParents = (parentsId) => {

    const [listClass, setListClass] = useState([])
    const [itemClassId, setItemClassId] = useState()
    const [listNodeClass, setListNodeClass] = useState([])
    const [nodeClass, setNodeClass] = useState(null)  
    const [showToast, setShowToast] = useState(false);
    const [showContentToast, setShowContentToast] = useState();
    const [showModalUpdateNode, setShowModalUpdateNode] = useState(false);
    const [showEvalute, setShowEvalute] = useState(false)
    const [formUpdateNode, setFormUpdateNode] = useState({
        nodeGrade: '5',
        nodeResponse: ''
    });
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [evaluteTutor, setEvaluteTutor] = useState({
        tutorGrade: 5,
        feedBack: ''
    });

    const [controlChild, setControlChild] = useState(false)
    const handleControlChild = () => {
        setControlChild(!controlChild)
    } 
    
    const handleShowEvalute = (newValue) => {
        setShowEvalute(newValue);
    };
    
    const handleChangeEvalute = (e) => {
        const { name, value } = e.target;
        setEvaluteTutor({
          ...evaluteTutor,
          [name]: value
        });
    };
    
    const handleSubmitEvalute = async (e) => {
        e.preventDefault();
        try {
            const selectedItemClass = listClass.find(itemClass => itemClass.classId === itemClassId);

            const evaluteDataForm = {
                "tutorId": selectedItemClass.tutorId,
                "classId": itemClassId,
                "parentsId": parentsId,
                ...evaluteTutor
            }

            const response = await axios.post(`${apiUrl}/evalutetutor/addEvalute`, evaluteDataForm);
            
            if(response.data.success) {
                setEvaluteTutor({
                    ...evaluteTutor,
                    "tutorGrade": response.data.evaluteData.tutorGrade,
                    "feedBack": response.data.evaluteData.feedBack
                })
            }
        } catch (error) {
            console.log(error)
        }

        handleShowEvalute();
        console.log(evaluteTutor);
    };

    const handleCloseModalUpdateNode = () => setShowModalUpdateNode(false);
    const handleOpenModalUpdateNode = (currentNodeClass) => () => {  // Sửa lại để trả về một hàm
        setNodeClass(currentNodeClass)
        setFormUpdateNode({
            nodeGrade: currentNodeClass.nodeGrade,
            nodeResponse: currentNodeClass.nodeResponse
        })
        setShowModalUpdateNode(true)
    };

    // sử dụng để thay đổi trạng thái update
    useEffect(() => {
        setUpdateSuccess(false)
    }, [updateSuccess]);

    // sử dụng để cập nhật đánh giá khi thay đổi class
    useEffect(() => {
        axios.get(`${apiUrl}/evalutetutor/getEvalute/${itemClassId}`)
            .then(response => {
                if(response.data.success) {
                  setEvaluteTutor({
                    ...evaluteTutor,
                    "tutorGrade": response.data.evaluteTutor.tutorGrade,
                    "feedBack": response.data.evaluteTutor.feedBack
                  })
                } else {
                    if(response.data.type === 'none') {
                        setEvaluteTutor({
                            ...evaluteTutor,
                            "tutorGrade": 5,
                            "feedBack": ""
                        })
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [itemClassId]);

    // sử dụng để cập nhật danh sách lớp của phụ huynh
    useEffect(() => {
        axios.get(`${apiUrl}/classes/getAll/${parentsId.parentsId}`)
            .then(response => {
                if(response.data.success) {
                  setListClass(response.data.parentsClasses)
                  setItemClassId(response.data.parentsClasses[0].classId)
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [controlChild]);

    // sử dụng để cập nhật danh sách ghi chú của một lớp khi update đánh giá hoặc có sự thay đổi class
    useEffect(() => {
        console.log('re-render')
        if(itemClassId) {
            axios.get(`${apiUrl}/nodeclass/getAllByClassId/${itemClassId}`)
                .then(response => {
                    if(response.data.success) {
                        let nodeClassList = response.data.nodeClassList;
                        nodeClassList.sort((a, b) => new Date(b.nodeDate) - new Date(a.nodeDate));
                        setListNodeClass(nodeClassList)
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }
    }, [updateSuccess, itemClassId]);

    // sử dụng để tahy đổi classId khi click vào class mới
    const handleDetailClass = (classId) => {
        setItemClassId(classId)
        console.log(classId);
    }
    
    // sử dụng để điều khiển sự thay đổi của form Update evalute
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormUpdateNode({
          ...formUpdateNode,
          [name]: value
        });
    };
    
    // sử dụng để điều khiểm submit form Update evalute
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCloseModalUpdateNode();


        try {
            const response = await axios.post(`${apiUrl}/nodeclass/updateNodeClass/${nodeClass.nodeId}`, formUpdateNode);
            if(response.data.success) {
                handleCloseModalUpdateNode();
                setShowContentToast('Thêm đánh giá và phản hồi thành công.')
                setUpdateSuccess(true);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                handleCloseModalUpdateNode();
                setShowContentToast('Thêm đánh giá và phản hồi thất bại. Hãy thử lại sau!')
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }           
        } catch (error) {
            console.log(error);
        }

        console.log(formUpdateNode);
    };

    const getClassStatusContent = (selectedItemClass) => {
        const classStatus = selectedItemClass.classStatus

        switch(classStatus) {
            case 'Đang xử lý':
                return (
                    <div>
                        <p style={{ color: 'red' }}>{`Tình trạng: Đang xử lý`}</p>
                        <ClassInfoCard selectedClass={selectedItemClass} type={"full"}/>
                        <p><br></br>Nhân viên HustTeach đang trong quá trình xử lý thông tin lớp học, 
                            xin quý phụ huynh chờ trong một khoảng thời gian. Nhân viên HustTeach sẽ sớm liên hệ tới quý phụ huynh. <br></br><br></br>
                            Cảm ơn quý phụ huynh vì đã tin tưởng trung tâm! <br></br>
                            Trân trọng!!!
                        </p>
                    </div>
                )
            case 'Đang tìm gia sư':
                return (
                    <div>
                        <p style={{ color: '#FFC000' }}>{`Tình trạng: Đang tìm gia sư`}</p>
                        <ClassInfoCard selectedClass={selectedItemClass} type={"hybrid"}/>


                        <ManageFindingClass currentClass={selectedItemClass} controlChild={controlChild} reRenderParents={handleControlChild}/>
                    </div>
                )
            case 'Đang dạy':
                return (
                    <div>
                        <p style={{ color: '#00B050' }}>Tình trạng: Đang dạy</p>

                        <ClassInfoCard selectedClass={selectedItemClass} type={"small"} />
                        
                        { !(listNodeClass.length === 0) && 
                        <div>
                        {
                            listNodeClass.map((nodeClass) => (
                                <div key={nodeClass.nodeId}>

                                    <div className='mt-20' style={{display: 'flex', alignItems: 'baseline'}}>
                                        <img src={openbook} alt='openbook' width="20px" height="20px" className='mr-10'></img>
                                        <span style={{color: '#00B050'}}><strong>{`Buổi dạy ngày ${convertDate(nodeClass.nodeDate)}`}</strong></span>
                                        <Button variant="primary" size="sm" className="button-css ml-20" onClick={handleOpenModalUpdateNode(nodeClass)}>
                                            Đánh giá buổi học 
                                        </Button>
                                    </div>
                                    <ul>
                                        <li>
                                            {`Thời gian: ${nodeClass.nodeTime}`}
                                        </li>
                                        <li>
                                            {`Chủ đề buổi học: ${nodeClass.nodeTopic}`}
                                        </li>
                                        <li>
                                            {`Nhận xét về buổi học: ${nodeClass.nodeComment}`}
                                        </li>
                                        {nodeClass.nodeGrade && 
                                        <li>
                                            {`Điểm đánh giá của phụ huynh: ${nodeClass.nodeGrade}`}
                                        </li>
                                        }
                                        {nodeClass.nodeResponse && 
                                        <li>
                                            {`Phản hồi của phụ huynh: ${nodeClass.nodeResponse}`}
                                        </li>
                                        }
                                    </ul>
                                </div>
                              ))
                        }
                        </div> }

                        <Modal show={showModalUpdateNode} onHide={handleCloseModalUpdateNode}>
                            <Modal.Header closeButton>
                                <Modal.Title>Đánh giá và phản hồi về buổi dạy</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {nodeClass && (  // Kiểm tra xem nodeClass có tồn tại hay không
                                    <ul>
                                        <li> {`Thời gian: ${nodeClass.nodeTime}`}</li>
                                        <li> {`Chủ đề buổi học: ${nodeClass.nodeTopic}`} </li>
                                        <li> {`Nhận xét về buổi học: ${nodeClass.nodeComment}`}</li>
                                    </ul>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formRating">
                                        <Form.Label>Chọn đánh giá (5 - 10)</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="nodeGrade" 
                                            value={formUpdateNode.nodeGrade} 
                                            onChange={handleChange}
                                        >
                                            {Array.from({ length: 11 }, (_, i) => 5 + i * 0.5).map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formFeedback">
                                        <Form.Label>Phản hồi về buổi dạy</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            name="nodeResponse" 
                                            value={formUpdateNode.nodeResponse} 
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <div style={{textAlign: 'right'}}>
                                        <Button variant="primary" className="button-css" type="submit" >
                                            Lưu ghi chú
                                        </Button>
                                    </div>
                                </Form>
                            </Modal.Body>
                        </Modal>

                        <ToastContainer style={{position: 'fixed', top: '50px', right: '0px'}} >
                            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                                <Toast.Header>
                                    <strong className="me-auto">Thông báo</strong>
                                </Toast.Header>
                                <Toast.Body>{showContentToast}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>
                ) 
            case 'Kết thúc':
                return (
                    <div>
                        <p style={{ color: '#156082' }}>Tình trạng: Kết thúc</p>

                        <ClassInfoCard selectedClass={selectedItemClass} type={"small"} />

                        <div>
                            <div className="mb-10 mt-20" >
                                <span style={{color: '#156082'}}><strong>Đánh giá của phụ huynh sau khi kết thúc gia sư</strong></span>
                                <button style={{backgroundColor: 'white', border: 'none'}} onClick={handleShowEvalute}>
                                    <img  src={hand} alt='tap' width="20px" height="20px" className='ml-10'></img>
                                </button>
                            </div>

                            { showEvalute && 
                            <div>
                                <ProgressBar style={{minHeight: '20px'}} animated  now={evaluteTutor.tutorGrade} label={`${evaluteTutor.tutorGrade}/100`} />
                                <div className="mt-10" style={{ padding: '20px', borderRadius: '10px', backgroundColor: "rgb(189, 227, 244)"}}>
                                    <pre>{evaluteTutor.feedBack}</pre>
                                </div>
                            </div>
                            }

                            { !showEvalute && 
                            <Form onSubmit={handleSubmitEvalute}>
                                <Form.Group controlId="formRange">
                                    <Form.Label>Đánh giá gia sư: {evaluteTutor.tutorGrade}</Form.Label>
                                    <Form.Range
                                        value={evaluteTutor.tutorGrade}
                                        min={5}
                                        max={100}
                                        step={5}
                                        name="tutorGrade"
                                        onChange={handleChangeEvalute}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFeedback" className="mt-3">
                                    <FloatingLabel controlId="floatingTextarea" label="Feedback về gia sư">
                                        <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        name="feedBack"
                                        value={evaluteTutor.feedBack}
                                        onChange={handleChangeEvalute}
                                        style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <div style={{textAlign: 'right'}}>
                                    <Button variant="primary" type="submit" className="mt-3">
                                        Xác nhận đánh giá
                                    </Button>
                                </div>
                            </Form>
                            }
                        </div>

                        { !(listNodeClass.length === 0) && 
                        <div>
                        {
                            listNodeClass.map((nodeClass) => (
                                <div key={nodeClass.nodeId}>

                                    <div className='mt-20' style={{display: 'flex', alignItems: 'baseline'}}>
                                        <img src={openbook} alt='openbook' width="20px" height="20px" className='mr-10'></img>
                                        <span style={{color: '#00B050'}}><strong>{`Buổi dạy ngày ${convertDate(nodeClass.nodeDate)}`}</strong></span>
                                    </div>
                                    <ul>
                                        <li>
                                            {`Thời gian: ${nodeClass.nodeTime}`}
                                        </li>
                                        <li>
                                            {`Chủ đề buổi học: ${nodeClass.nodeTopic}`}
                                        </li>
                                        <li>
                                            {`Nhận xét về buổi học: ${nodeClass.nodeComment}`}
                                        </li>
                                        {nodeClass.nodeGrade && 
                                        <li>
                                            {`Điểm đánh giá của phụ huynh: ${nodeClass.nodeGrade}`}
                                        </li>
                                        }
                                        {nodeClass.nodeResponse && 
                                        <li>
                                            {`Phản hồi của phụ huynh: ${nodeClass.nodeResponse}`}
                                        </li>
                                        }
                                    </ul>
                                </div>
                              ))
                        }
                        </div> 
                        }
                        
                    </div>
                )
            default:
                return null;
        }
    }

    const selectedItemClass = listClass.find(itemClass => itemClass.classId === itemClassId);

    return (
        <Container>
            <div className="listclass-title mt-30 mb-20"><span >Quản lý lớp học</span></div>
            <Row>
                <Col xs={3}>
                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px'}} >
                            <span>Quản lý lớp học</span>
                        </div>
                        {
                            listClass.map((itemClass) => (
                                <div key={itemClass.classId} style={{cursor: 'pointer'}}>
                                    <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                                    <span 
                                        className="span-css-blue-16" 
                                        onClick={() => handleDetailClass(itemClass.classId)}
                                        style={{ color: itemClassId === itemClass.classId ? '#00B050' : '#156082' }}>
                                            {itemClass.classId}
                                    </span>
                                </div>
                              ))
                        }

                    </div>

                </Col>

                <Col xs={9}>
                    <div className="listclass-title" style={{color: '#156082'}}>
                        <p>{`Node theo dõi lớp ${itemClassId}`}</p>
                    </div>
                    <div>
                        {selectedItemClass ? getClassStatusContent(selectedItemClass) : 'Chọn một lớp học để xem chi tiết'}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ManagementClassesParents
