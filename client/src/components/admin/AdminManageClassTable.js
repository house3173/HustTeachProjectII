import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal, ToastContainer, Toast } from 'react-bootstrap';
import { apiUrl } from '../../contexts/constants';
import EndingClassInfo from '../manageclass/EndingClassInfo';

const AdminManageClassTable = () => {
    const [listClass, setListClass] = useState([]);
    const [listParents, setListParents] = useState([]);
    const [listTutor, setListTutor] = useState([]);
    const [listStaff, setListStaff] = useState([]);
    const [listCurrInfo, setListCurrInfo] = useState({
        "classInfo": {},
        "parentsInfo": {},
        "tutorInfo": {},
        "staffInfo": {}
    });

    const [showModalEndClass, setShowModalEndClass] = useState(false)
    const [showModalConfirmClass, setShowModalConfirmClass] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState({});
    const [reRender, setReRender] = useState(false)

    const currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
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
                    const parentsList = response.data.parentsList;
                    setListParents(parentsList);
                    console.log("LIST PARENTS: ", parentsList);
                }
            })
            .catch(error => {
                console.error('Error fetching PARENTS:', error);
            });

        if (actorState === 'adminMainHome') {
            axios.get(`${apiUrl}/classes/getAll`)
                .then(response => {
                    if (response.data.success) {
                        const classList = response.data.classes;
                        setListClass(classList);
                        console.log("LIST CLASS: ", classList);
                    }
                })
                .catch(error => {
                    console.error('Error fetching CLASSES:', error);
                });
        }
        if (actorState === 'adminMainHome') {
            axios.get(`${apiUrl}/tutor/getAll`)
                .then(response => {
                    if (response.data.success) {
                        const listTutor = response.data.tutorList
                        setListTutor(listTutor)
                        console.log("LIST TUTOR:", listTutor);
                    }
                })
                .catch(error => {
                    console.error('Error fetching TUTOR:', error);
                });
        }

        if (actorState === 'adminMainHome') {
            axios.get(`${apiUrl}/staff/getAll`)
                .then(response => {
                    if (response.data.success) {
                        const listStaff = response.data.staffList
                        setListStaff(listStaff)
                        console.log("LIST STAFF:", listStaff);
                    }
                })
                .catch(error => {
                    console.error('Error fetching STAFF:', error);
                });
        }
    }, [reRender]);

    const handleWatchDetail = (classItem, parents, tutor, staff) => {
        setListCurrInfo({
            "classInfo": classItem,
            "parentsInfo": parents,
            "tutorInfo": tutor,
            "staffInfo": staff
        });

        setShowModalEndClass(true);
    };

    const handleConfirm = (classItem, parents, tutor, staff) => {
        setListCurrInfo({
            "classInfo": classItem,
            "parentsInfo": parents,
            "tutorInfo": tutor,
            "staffInfo": staff
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
            if (response.data.success) {
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

    const handleStaffChange = (classId, staffId) => {
        setSelectedStaff({
            ...selectedStaff,
            [classId]: staffId
        });
    };

    const handleAssignStaff = async (classId) => {
        const staffId = selectedStaff[classId];
        const staff = listStaff.find(staffItem => staffItem.staffId === staffId);
        console.log(`Assigned staff ${staff.staffName} (ID: ${staffId}) to class ${classId}`);
        const updateStaffClass = {
            "classId": classId,
            "staffId": staffId
        }

        try {
            const response = await axios.post(`${apiUrl}/classes/updateClass`, updateStaffClass);
            if(response.data.success) {
                setListCurrInfo((prev) => (
                    {
                        ...prev,
                        "classInfo": response.data.updatedClass
                    }
                ))
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setReRender(!reRender)
               
            }
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    return (
        <Container className='mt-30'>
            <div className="mb-20">
                <span className="listclass-title" style={{ fontSize: '24px' }}>Quản lý lớp</span>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr className='center-th-xy'>
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
                        <th>Staff ID</th>
                        <th>Staff Name</th>
                        <th>Phân việc</th>
                    </tr>
                </thead>
                <tbody>
                    {listClass.map((classItem, index) => {
                        const parents = listParents.find(parentsItem => parentsItem.parentsId === classItem.parentsId);
                        const tutor = listTutor.find(tutorItem => tutorItem.tutorId === classItem.tutorId);
                        const staff = listStaff.find(staffItem => staffItem.staffId === classItem.staffId);

                        return (
                            <tr key={index} style={{verticalAlign: "middle"}}>
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
                                {classItem.classStatus !== 'Đang xử lý' && <td></td>}

                                {/* Cột chứa mã của nhân viên */}
                                <td>
                                    <select className='select-table' onChange={(e) => handleStaffChange(classItem.classId, e.target.value)} value={selectedStaff[classItem.classId] || (staff ? staff.staffId : '')}>
                                        <option value="">Chọn nhân viên</option>
                                        {listStaff.map(staffItem => (
                                            <option key={staffItem.staffId} value={staffItem.staffId}>
                                                {staffItem.staffId}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                {/* Cột chứa tên của nhân viên */}
                                <td>
                                    {selectedStaff[classItem.classId] 
                                        ? listStaff.find(staffItem => staffItem.staffId === selectedStaff[classItem.classId])?.staffName 
                                        : (staff ? staff.staffName : 'N/A')}
                                </td>

                                {/* Cột chứa button phân việc nhân viên */}
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleAssignStaff(classItem.classId)}
                                        disabled={!selectedStaff[classItem.classId]}
                                    >
                                        Phân việc
                                    </Button>
                                </td>
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
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo} parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo} />
                    }
                    {listCurrInfo.classInfo && listCurrInfo.parentsInfo && listCurrInfo.classInfo.classStatus === 'Đang xử lý' &&
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo} parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo} />
                    }
                    {listCurrInfo.classInfo && listCurrInfo.parentsInfo && listCurrInfo.classInfo.classStatus === 'Đang tìm gia sư' &&
                        <EndingClassInfo selectedItemClass={listCurrInfo.classInfo} parentsInfo={listCurrInfo.parentsInfo} tutorInfo={listCurrInfo.tutorInfo} />
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

            {/* Toast alert change staff for class successfully */}
            <ToastContainer style={{position: 'fixed', top: '150px', right: '0px'}} >
                        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Thông báo</strong>
                            </Toast.Header>
                            <Toast.Body>Phân việc cho nhân viên thành công</Toast.Body>
                        </Toast>
            </ToastContainer>

        </Container>
    );
};

export default AdminManageClassTable;
