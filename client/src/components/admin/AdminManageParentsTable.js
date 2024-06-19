import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import { apiUrl } from '../../contexts/constants';

const AdminManageParentsTable = () => {
    const [parentsList, setParentsList] = useState([]);
    const [currentParent, setCurrentParent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAllParents();
    }, []);

    const fetchAllParents = async () => {
        try {
            const response = await axios.get(`${apiUrl}/parents/getAll`);
            if (response.data.success) {
                const parentsList = response.data.parentsList || [];
                const parentsListWithClassCount = await Promise.all(
                    parentsList.map(async (parent) => {
                        try {
                            const classResponse = await axios.get(`${apiUrl}/classes/getAllByParents/${parent.parentsId}`);
                            return { ...parent, classCount: classResponse.data.parentsClasses.length };
                        } catch (error) {
                            console.error(`Error fetching classes for parent ${parent.parentsId}:`, error);
                            return { ...parent, classCount: 0 };
                        }
                    })
                );
                setParentsList(parentsListWithClassCount);
            } else {
                console.error('Error fetching parents: response indicates failure', response.data);
            }
        } catch (error) {
            console.error('Error fetching parents:', error);
        }
    };

    const handleShowDetails = (parent) => {
        setCurrentParent(parent);
        setShowModal(true);
    };

    const handleDeleteParent = async (parentsId) => {
        try {
            const response = await axios.post(`${apiUrl}/parents/deleteParents/${parentsId}`);
            if (response.data.success) {
                fetchAllParents();
            }
        } catch (error) {
            console.error('Error deleting parent:', error);
        }
    };

    return (
        <Container className="mt-30">
            <div className="row">
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Parents ID</th>
                                <th>Parents Name</th>
                                <th>Parents Email</th>
                                <th>Parents Phone</th>
                                <th>Số lượng lớp</th>
                                <th>Chi tiết</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parentsList.map(parent => {
                                return (
                                    <tr key={parent.parentsId}>
                                        <td>{parent.parentsId}</td>
                                        <td>{parent.parentsName}</td>
                                        <td>{parent.parentsEmail}</td>
                                        <td>{parent.parentsPhone}</td>
                                        <td>{parent.classCount}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => handleShowDetails(parent)}
                                            >
                                                Chi tiết
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                disabled={parent.classCount > 0}
                                                onClick={() => handleDeleteParent(parent.parentsId)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            {currentParent && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin chi tiết phụ huynh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Mã phụ huynh: {currentParent.parentsId}</p>
                        <p>Tên phụ huynh: {currentParent.parentsName}</p>
                        <p>Email: {currentParent.parentsEmail}</p>
                        <p>Số điện thoại: {currentParent.parentsPhone}</p>
                        <p>Số lượng lớp: {currentParent.classCount}</p>
                        {/* Add more detailed information here if needed */}
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

export default AdminManageParentsTable;
