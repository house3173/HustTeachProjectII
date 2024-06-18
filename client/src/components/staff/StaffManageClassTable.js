import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { apiUrl } from '../../contexts/constants';
import EndingClassInfo from '../manageclass/EndingClassInfo';

const StaffManageClassTable = () => {
    const [listClass, setListClass] = useState([]);
    const [listParents, setListParents] = useState([]);
    const [listTutor, setListTutor] = useState([])
    const [listCurrInfo, setListCurrInfo] = useState({
        "classInfo": {},
        "parentsInfo": {},
        "tutorInfo": {},
    });

    const [showModalEndClass, setShowModalEndClass] = useState(false)
    const [showModalConfirmClass, setShowModalConfirmClass] = useState(false)

    const [reRender, setReRender] = useState(false)

    const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));
    const actorState = JSON.parse(localStorage.getItem('actorState'));

    const getClassStatusOrder = (status) => {
        switch (status) {
            case "Đang xử lý":
                return 1;
            case "Đang tìm gia sư":
                return 2;
            case "Đang dạy":
                return 3;
            case "Kết thúc":
                return 4;
            default:
                return 5;
        }
    };

    useEffect(() => {
        axios.get(`${apiUrl}/parents/getAll`)
            .then(response => {
                if (response.data.success) {
                    const listParentsInfo = response.data.parentsList;
                    setListParents(listParentsInfo);
                    console.log(listParentsInfo);
                }
            })
            .catch(error => {
                console.error('Error fetching parents:', error);
            });

        if (actorState === 'staffMainHome') {
            axios.get(`${apiUrl}/classes/getAllByStaff/${currentStaff.staffId}`)
                .then(response => {
                    if (response.data.success) {
                        const listClassStaff = response.data.staffClasses;
                        const sortedClassList = listClassStaff.sort((a, b) => getClassStatusOrder(a.classStatus) - getClassStatusOrder(b.classStatus));
                        setListClass(sortedClassList);
                        console.log(sortedClassList);
                    }
                })
                .catch(error => {
                    console.error('Error fetching classes:', error);
                });
        }
        if (actorState === 'staffMainHome') {
            axios.get(`${apiUrl}/tutor/getAll`)
                .then(response => {
                    if (response.data.success) {
                        const listTutor = response.data.tutorList
                        setListTutor(listTutor)
                        console.log(listTutor);
                    }
                })
                .catch(error => {
                    console.error('Error fetching classes:', error);
                });
        }
    }, [actorState, currentStaff.staffId, reRender]);

    const handleWatchDetail = (classItem, parents, tutor) => {
        setListCurrInfo({
            "classInfo": classItem,
            "parentsInfo": parents,
            "tutorInfo": tutor,
        });

        setShowModalEndClass(true);
    };

    const handleConfirm = (classItem, parents, tutor) => {
        setListCurrInfo({
            "classInfo": classItem,
            "parentsInfo": parents,
            "tutorInfo": tutor,
        });
        console.log(listCurrInfo)

        setShowModalConfirmClass(true)
    }

    const confirmSuccess = async () => {
            const confirmData = {
                "classId": listCurrInfo.classInfo.classId,
                "classStatus": "Đang tìm gia sư"
            }

            try {
                const response = await axios.post(`${apiUrl}/classes/updateClass`, confirmData);
                if(response.data.success) {
                    setListCurrInfo((prev) => (
                        {
                            ...prev,
                            "classInfo": response.data.updatedClass
                        }
                    ))
                    setReRender(!reRender)
                    console.log(listCurrInfo)
                    setShowModalConfirmClass(false)
                }
            } catch (error) {
                console.error('Error saving form:', error);
            }
    }
        

    return (
        
        <Container className='mt-30'>
            <div className="mb-20">
                <span className="listclass-title" style={{ fontSize: '24px' }}>Quản lý lớp</span>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Class ID</th>
                        <th>Class Status</th>
                        <th>Parents ID</th>
                        <th>Parents Name</th>
                        <th>Parents Phone</th>
                        <th>Tutor ID</th>
                        <th>Class Subject</th>
                        <th>Class Grade</th>
                        <th>Xem chi tiết</th>
                        <th>Xác nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {listClass.map((classItem, index) => {
                        const parents = listParents.find(parentsItem => parentsItem.parentsId === classItem.parentsId);
                        const tutor = listTutor.find(tutorItem => tutorItem.tutorId === classItem.tutorId);

                        return (
                            <tr key={index}>
                                <td>{classItem.classId}</td>
                                <td>{classItem.classStatus}</td>
                                <td>{classItem.parentsId}</td>
                                <td>{parents ? parents.parentsName : 'N/A'}</td>
                                <td>{classItem.parentsPhone}</td>
                                <td>{classItem.tutorId}</td>
                                <td>{classItem.classSubject}</td>
                                <td>{classItem.classGrade}</td>
                                <td><Button variant="info" onClick={() => handleWatchDetail(classItem, parents, tutor)}>Xem chi tiết</Button></td>
                                {classItem.classStatus === 'Đang xử lý' && <td><Button variant="success" onClick={() => handleConfirm(classItem, parents, tutor)}>Xác nhận</Button></td>}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            {/* Modal for EndingClassInfo */}
            <Modal show={showModalEndClass} onHide={() => setShowModalEndClass(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Thông tin lớp ${listCurrInfo.classInfo.classId}`} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listCurrInfo.classInfo && listCurrInfo.parentsInfo && listCurrInfo.tutorInfo && 
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo}  parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo}/>
                    }
                    {listCurrInfo.classInfo && listCurrInfo.parentsInfo && listCurrInfo.classInfo.classStatus === 'Đang xử lý' &&
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo}  parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo}/>
                    }
                    {listCurrInfo.classInfo && listCurrInfo.parentsInfo && listCurrInfo.classInfo.classStatus === 'Đang tìm gia sư' &&
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo}  parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo}/>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEndClass(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for EndingClassInfo */}
            <Modal show={showModalConfirmClass} onHide={() => setShowModalConfirmClass(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Xác nhận yêu cầu lớp ${listCurrInfo.classInfo.classId}`} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận yêu cầu và Chuyển trạng thái lớp sang "Đang tìm gia sư"
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalConfirmClass(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => confirmSuccess()}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default StaffManageClassTable;
