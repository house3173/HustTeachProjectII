import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Form, Row, Col } from 'react-bootstrap';
import { apiUrl } from '../../contexts/constants';

const AdminManageStaffTable = () => {
    const [listStaff, setListStaff] = useState([]);
    const [newStaffName, setNewStaffName] = useState('');
    const [newStaffPassword, setNewStaffPassword] = useState('');
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        fetchAllStaff();
    }, [reRender]);

    const fetchAllStaff = async () => {
        try {
            const response = await axios.get(`${apiUrl}/staff/getAll`);
            if (response.data.success) {
                const staffList = response.data.staffList;
                const staffListWithClassCount = await Promise.all(
                    staffList.map(async (staff) => {
                        const classResponse = await axios.get(`${apiUrl}/classes/getAllByStaff/${staff.staffId}`);
                        return { ...staff, classCount: classResponse.data.staffClasses.length };
                    })
                );
                setListStaff(staffListWithClassCount);
            }
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleAddStaff = async (e) => {
        e.preventDefault();
        const randomStaffId = `NV${Math.floor(10000 + Math.random() * 90000)}`;
        const newStaff = {
            staffId: randomStaffId,
            staffName: newStaffName,
            staffPassword: newStaffPassword
        };

        try {
            console.log(newStaff)
            const response = await axios.post(`${apiUrl}/staff/create`, newStaff);
            if (response.data.success) {
                setNewStaffName('');
                setNewStaffPassword('');
                setReRender(!reRender);
            }
        } catch (error) {
            console.error('Error adding new staff:', error);
        }
    };

    return (
        <Container className='mt-30'>
            <div className="mb-20">
                <span className="listclass-title" style={{ fontSize: '24px' }}>Quản lý nhân viên</span>
            </div>
            <Row>
                <Col md={7}>
                    <p><strong>Danh sách nhân viên</strong></p>
                    <Table style={{width: "90%"}} striped bordered hover>
                        <thead>
                            <tr className='center-th'>
                                <th>Mã nhân viên</th>
                                <th>Tên nhân viên</th>
                                <th>Số lượng lớp quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStaff.map((staff, index) => (
                                <tr key={index} className='center-td'>
                                    <td>{staff.staffId}</td>
                                    <td>{staff.staffName}</td>
                                    <td>{staff.classCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={5}>
                    <p><strong>Thêm nhân viên mới</strong></p>
                    <Form onSubmit={handleAddStaff}>
                        <Form.Group controlId="formStaffName">
                            <Form.Label >Tên nhân viên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên nhân viên"
                                value={newStaffName}
                                onChange={(e) => setNewStaffName(e.target.value)}
                                required
                                className='mb-3'
                            />
                        </Form.Group>

                        <Form.Group controlId="formStaffPassword">
                            <Form.Label className='mt-3'>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={newStaffPassword}
                                onChange={(e) => setNewStaffPassword(e.target.value)}
                                required
                                className='mb-3'
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Thêm nhân viên
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminManageStaffTable;
