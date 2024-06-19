import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { apiUrl } from '../../contexts/constants';
import ModalInfo from '../tutor/ModalInfo';

const AdminManageTutorTable = () => {
    const [listTutor, setListTutor] = useState([]);
    const [tutorDetails, setTutorDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [tutorId, setTutorId] = useState()

    useEffect(() => {
        fetchAllTutors();
    }, [reRender]);

    const fetchAllTutors = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tutor/getAll`);
            if (response.data.success) {
                const tutorList = response.data.tutorList || [];
                const tutorListWithClassCount = await Promise.all(
                    tutorList.map(async (tutor) => {
                        try {
                            const classResponse = await axios.get(`${apiUrl}/classes/getAllByTutor/${tutor.tutorId}`);
                            return { ...tutor, classCount: classResponse.data.tutorClasses.length };
                        } catch (error) {
                            console.error(`Error fetching classes for tutor ${tutor.tutorId}:`, error);
                            return { ...tutor, classCount: 0 };
                        }
                    })
                );
                setListTutor(tutorListWithClassCount);
            } else {
                console.error('Error fetching tutors: response indicates failure', response.data);
            }
        } catch (error) {
            console.error('Error fetching tutors:', error);
        }
    };

    const handleShowDetails = (tutor) => {
        setTutorDetails(tutor);
        setTutorId(tutor.tutorId)
        setShowModal(true);
    };

    const handleDeleteTutor = async (tutorId) => {
        try {
            const response = await axios.post(`${apiUrl}/tutor/deleteTutor/${tutorId}`);
            if (response.data.success) {
                setReRender(!reRender); 
            } else {
                console.error('Error deleting tutor: response indicates failure', response.data);
            }
        } catch (error) {
            console.error('Error deleting tutor:', error);
        }
    };

    return (
        <Container className='mt-30'>
            <h3>Danh sách gia sư</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã gia sư</th>
                        <th>Tên gia sư</th>
                        <th>Email gia sư</th>
                        <th>Số lượng lớp đang dạy</th>
                        <th>Chi tiết</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {listTutor.length > 0 ? (
                        listTutor.map((tutor, index) => (
                            <tr key={index}>
                                <td>{tutor.tutorId}</td>
                                <td>{tutor.tutorName}</td>
                                <td>{tutor.tutorEmail}</td>
                                <td>{tutor.classCount}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleShowDetails(tutor)}>Chi tiết</Button>
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteTutor(tutor.tutorId)}
                                        disabled={tutor.classCount > 0}
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Không có dữ liệu gia sư</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {tutorDetails && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết gia sư {tutorDetails.tutorId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Tên gia sư:</strong> {tutorDetails.tutorName}</p>
                        <p><strong>Email gia sư:</strong> {tutorDetails.tutorEmail}</p>
                        <p><strong>Số lượng lớp đang dạy:</strong> {tutorDetails.classCount}</p>
                        <ModalInfo tutorId={tutorId}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default AdminManageTutorTable;
