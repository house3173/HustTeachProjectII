import ClassInfoCard from "../classes/ClassInfoCard";
import openbook from '../../assets/images/open-book.png'
import { Button, Col, Container, Row, Form, FloatingLabel, Modal, ToastContainer, Toast, ProgressBar} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import convertDate from "../../utils/convertDate";

const AMManageClasses = ({selectedClass, listWaitClass}) => {
    // const selectedClass = JSON.parse(localStorage.getItem('selectedClass'));
    const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
    
    const [selectedClassInfo, setSelectedClassInfo] = useState(selectedClass);
    const [selectedClassId, setSelectedClassId] = useState(selectedClass.classId)

    const [listNodeClass, setListNodeClass] = useState([])
    const [itemNodeId, setItemNodeId] = useState('')

    const [errorModal, setErrorModal] = useState('')
    const [showToast, setShowToast] = useState(false);
    const [showContentToast, setShowContentToast] = useState('');

    const [evaluteTutor, setEvaluteTutor] = useState('')
    const [addNodeData, setAddNodeData] = useState({
        classId: '',
        nodeDate: '',
        nodeTime: '',
        nodeTopic: '',
        nodeComment: ''
    });

    const [render, setRender] = useState(false)

    const [showModalAddNode, setShowModalAddNode] = useState(false);
    const [showModalAgree, setShowModalAgree] = useState(false);
    const [showModalReject, setShowModalReject] = useState(false);
    const handleCloseModalAddNode = () => setShowModalAddNode(false);
    const handleOpenModalAddNode = () => setShowModalAddNode(true);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddNodeData({ ...addNodeData, [name]: value });
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(addNodeData.nodeDate === '') {
            setErrorModal('Ngày của buổi dạy không được để trống')
            return
        }
        if(addNodeData.nodeTime === '') {
            setErrorModal('Thời gian của buổi dạy không được để trống')
            return
        }
        if(addNodeData.nodeTopic === '') {
            setErrorModal('Chủ đề của buổi dạy không được để trống')
            return
        }
        if(addNodeData.nodeComment === '') {
            setErrorModal('Nhận xét về học sinh không được để trống')
            return
        }
        setErrorModal('')

        console.log('Old add node data:', addNodeData)
        console.log( 'selected add node class: ',selectedClass)
        setAddNodeData({...addNodeData, classId: selectedClass.classId})
        console.log('New add node data:', addNodeData)
        const addNodeDataForm = {
            ...addNodeData,
            classId: selectedClass.classId
        }
        console.log('Node form data:', addNodeDataForm)
        try {
            const response = await axios.post(`${apiUrl}/nodeclass/addNodeClass`, addNodeDataForm );
            if(response.data.success) {
                handleCloseModalAddNode();
                setShowContentToast('Thêm ghi chú buổi học thành công.')
                setItemNodeId(response.data.newNodeClass.nodeId)
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                handleCloseModalAddNode();
                setShowContentToast('Thêm ghi chú buổi học thất bại. Hãy thử lại sau!')
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }           
        } catch (error) {
            console.log(error);
        }

        console.log(addNodeData);
    };

    const handleConfirmClass = async (e) => {
        const confirmData = {
            "tutorId": currentTutor.tutorId,
            "classId": selectedClass.classId
        }

        try {
            const response = await axios.post(`${apiUrl}/waitclass/confirmClass`, confirmData);
            if(response.data.success) {
                setShowModalAgree(false)
                setRender(!render)
            } else {
                
            }           
        } catch (error) {
            console.log(error);
        }
    }

    const handleConfirmRejectClass = async (e) => {
        const confirmData = {
            "tutorId": currentTutor.tutorId,
            "classId": selectedClass.classId
        }

        try {
            const response = await axios.post(`${apiUrl}/waitclass/confirmRejectClass`, confirmData);
            if(response.data.success) {
                setShowModalReject(false)
                setRender(!render)
            } else {

            }           
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/nodeclass/getAllByClassId/${selectedClass.classId}`)
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
    }, [selectedClass, itemNodeId]);


    useEffect(() => {
        if(selectedClass.classStatus === 'Kết thúc') {
            axios.get(`${apiUrl}/evalutetutor/getEvalute/${selectedClass.classId}`)
                .then(response => {
                    if(response.data.success) {
                        setEvaluteTutor(response.data.evaluteTutor)
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }
    }, [selectedClass])

    useEffect(() => {
            console.log('Load class info')
            axios.get(`${apiUrl}/classes/getClassById/${selectedClass.classId}`)
                .then(response => {
                    if(response.data.success) {
                        setSelectedClassInfo(response.data.classes)
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        
    }, [render])
    

    // Lớp Đang ở trạng thái hoạt động --> có hai kiểu: Đang dạy hoặc Kết thúc
    if(selectedClass.tutorId === currentTutor.tutorId) {
        let type = 'Đang dạy'
        if(selectedClass.classStatus === 'Kết thúc') {
            type = ''
        }

            return (
                <div>
                    <div className="listclass-title" style={{color: '#156082'}}>
                        <span>{`Node theo dõi lớp ${selectedClass.classId}`}</span>
                        {type && <Button variant="primary" size="sm" className="button-css ml-20" onClick={handleOpenModalAddNode}>
                            Thêm ghi chú cho buổi học vừa kết thúc 
                        </Button>}
                    </div>
    
                    <div>
                        {type && <p style={{ color: '#00B050' }}>{`Tình trạng: Đang dạy`}</p>}
                        {!type && <p style={{ color: '#156082' }}>{`Tình trạng: Kết thúc`}</p>}
                        <ClassInfoCard selectedClass={selectedClass} type={"small"} />
                    </div>

                    {!type && evaluteTutor && 
                        <div>
                            <div className="mb-10 mt-20">
                                <span style={{color: '#156082'}}><strong>Đánh giá của phụ huynh sau khi kết thúc gia sư</strong></span>
                            </div>
                            <ProgressBar style={{minHeight: '20px'}} animated  now={Number(evaluteTutor.tutorGrade)} label={`${Number(evaluteTutor.tutorGrade)}/100`} />
                            <div className="mt-10" style={{ padding: '20px', borderRadius: '10px', backgroundColor: "rgb(189, 227, 244)"}}>
                                <pre>{evaluteTutor.feedBack}</pre>
                            </div>
                        </div>
                    }

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

                        <Modal show={showModalAddNode} onHide={handleCloseModalAddNode}>
                            <Modal.Header closeButton>
                                <Modal.Title>Thêm ghi chú buổi học mới</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <FloatingLabel controlId="floatingDate" label="Buổi dạy ngày" className="mb-3">
                                        <Form.Control 
                                            type="date" 
                                            name="nodeDate" 
                                            value={addNodeData.nodeDate} 
                                            onChange={handleChange} 
                                            required
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingTime" label="Thời gian dạy" className="mb-3">
                                        <Form.Control 
                                            type="text" 
                                            name="nodeTime" 
                                            value={addNodeData.nodeTime} 
                                            onChange={handleChange}
                                            required 
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingTopic" label="Chủ đề buổi học" className="mb-3">
                                        <Form.Control 
                                            as="textarea" 
                                            name="nodeTopic" 
                                            value={addNodeData.nodeTopic} 
                                            onChange={handleChange} 
                                            required
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingFeedback" label="Nhận xét buổi học" className="mb-3">
                                        <Form.Control 
                                            as="textarea" 
                                            name="nodeComment" 
                                            value={addNodeData.nodeComment} 
                                            onChange={handleChange} 
                                            required
                                        />
                                    </FloatingLabel>

                                    <div style={{textAlign: 'right'}}>
                                        <span className="mr-20" style={{color: 'red', textDecoration: 'italic'}}>{errorModal}</span>
                                        <Button variant="primary" className="button-css" type="button" onClick={handleSubmit}>
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

    } else {
        const selectedWaitClass = listWaitClass.find(itemClass => itemClass.classId === selectedClass.classId);
        // Lớp Đang ở trạng thái chờ xác nhận
        if(selectedClass.classStatus === 'Đang tìm gia sư' && selectedWaitClass.status !== 'Từ chối') {
            console.log('Đang chờ xác nhận')
            console.log(selectedClass)

            return (
                <div>
                    <div className="listclass-title" style={{color: '#156082'}}>
                        <p>{`Node theo dõi lớp ${selectedClass.classId}`}</p>
                    </div>

                    <div style={{marginTop: '-1rem'}}>
                        <p style={{ color: '#FFC000' }}>{`Tình trạng: ${selectedWaitClass.status}`}</p>
                        <ClassInfoCard selectedClass={selectedClass} type={"full"}/>
                        {selectedWaitClass.status === "Đang chờ" && 
                        <div>
                            <p><br></br>Yêu cầu của gia sư đang trong quá trình xử lý và chờ xác nhận, 
                            xin quý gia sư chờ trong một khoảng thời gian. Bạn sẽ sớm nhận được thông báo. <br></br><br></br>
                            Cảm ơn quý gia sư vì đã tin tưởng trung tâm! <br></br>
                            Trân trọng!!!
                            </p>
                        </div>
                        }

                        {selectedWaitClass.status === "Xác nhận" && 
                        <div>
                            <p><br></br>Yêu cầu của gia sư đã được phụ huynh xác nhận, 
                            xin quý gia sư xác nhận bắt đầu lớp học bằng cách click vào nút phía dưới <br></br>
                            Trân trọng!!!
                            </p>
                            <Button variant="primary" onClick={() => setShowModalAgree(true)}> Xác nhận </Button>
                            <Button variant="danger" onClick={() => setShowModalReject(true)} className="ml-30"> Từ chối </Button>

                            <Modal show={showModalAgree} onHide={() => setShowModalAgree(false)}>
                                <Modal.Header closeButton>
                                    {selectedClass &&
                                        <Modal.Title>{`Xác nhận nhận lớp ${selectedClass.classId}`}</Modal.Title>
                                    }
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedClass && 
                                        <p><strong>{`Khi nhấn nút xác nhận, bạn đồng ý bắt đầu gia sư cho lớp học ${selectedClass.classId}`} </strong></p>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModalAgree(false)}>Close</Button>
                                    <Button variant="primary" onClick={handleConfirmClass}>Xác nhận</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showModalReject} onHide={() => setShowModalReject(false)}>
                                <Modal.Header closeButton>
                                    {selectedClass &&
                                        <Modal.Title>{`Xác nhận từ chối lớp ${selectedClass.classId}`}</Modal.Title>
                                    }
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedClass && 
                                        <p><strong>{`Khi nhấn nút xác nhận, bạn xác nhận từ chối gia sư cho lớp ${selectedClass.classId}`} </strong></p>
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModalReject(false)}>Close</Button>
                                    <Button variant="primary" onClick={handleConfirmRejectClass}>Xác nhận</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        }
                    </div>
                </div>
            )
        } 
        // Lớp Đang ở trạng thái bị từ chối lớp
        else {
            console.log(listWaitClass)

            return (
                <div>
                    <div className="listclass-title" style={{color: '#156082'}}>
                        <p>{`Node theo dõi lớp ${selectedClass.classId}`}</p>
                    </div>

                    <div style={{marginTop: '-1rem'}}>
                        <p style={{ color: 'red' }}>{`Tình trạng: Từ chối`}</p>
                        <ClassInfoCard selectedClass={selectedClass} type={"full"}/>
                        <p className="mt-20">{selectedWaitClass.reason}</p>
                        <p>  Cảm ơn quý gia sư vì đã tin tưởng trung tâm! Hãy đăng ký các <a style={{textDecoration: 'none'}} href="/danh-sach-lop-phu-hop">lớp mới phù hợp</a> với bạn nhé!<br></br>
                              <br></br>  Trân trọng!!!
                        </p>
                    </div>
                </div>
            )
        }
    }
}

export default AMManageClasses