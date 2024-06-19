import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";
import filterIcon from '../../assets/images/filter.png';
import DropdownCheckbox from "./DropdownCheckbox";
import DropdownRadio from "./DropdownRadio";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

const SearchArea = ({ tabList, onApplyFilters }) => {
    const [subjects, setSubjects] = useState(['Math', 'Physics', 'Chemistry', 'Biology', 'English']);
    const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
    const districts = ['Thanh Xuân', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hà Đông', 'Hoàn Kiếm', 'Ba Đình', 'Tây Hồ', 'Long Biên'];
    const typeTutor = ['Sinh viên', 'Giáo viên', 'Cả hai'];
    const typeGender = ['Nam', 'Nữ', 'Cả hai'];

    useEffect(() => {
        axios.get(`${apiUrl}/subject/getAll`)
            .then(response => {
                if (response.data.success) {
                    const subjectNames = response.data.subjects.map(subject => subject.subjectName);
                    setSubjects(subjectNames);
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, []);

    const [tempSelectedValues, setTempSelectedValues] = useState({
        subjectChoose: [],
        gradeChoose: [],
        typeTutorChoose: [],
        typeGenderChoose: [],
        districtChoose: []
    });

    const handleTempSelect = (field, selectedOptions) => {
        setTempSelectedValues(prevState => ({
            ...prevState,
            [field]: selectedOptions
        }));
    };

    const handleApply = () => {
        setTempSelectedValues(tempSelectedValues);
        onApplyFilters(tempSelectedValues);
    };

    const handleResetFilter = () => {
        const emptyFilter = {
            subjectChoose: [],
            gradeChoose: [],
            typeTutorChoose: [],
            typeGenderChoose: [],
            districtChoose: []
        }
        setTempSelectedValues(emptyFilter)
        onApplyFilters(emptyFilter)
    }

    return (
        <Container className="mt-30">
            <div>
                <span className="listclass-title">{tabList.title}</span>
                <a href={tabList.href}>{tabList.hrefContent}</a>
            </div>
{/* 
            <Form className="mt-30 mb-20">
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Tìm kiếm lớp gia sư"
                        aria-label="Search"
                    />
                    <Button style={{ backgroundColor: "#00b050" }} type="submit">
                        Tìm kiếm
                    </Button>
                </InputGroup>
            </Form> */}

            <div>
                {/* <div className="mt-20">
                    <img src={filterIcon} alt="filter Icon"></img>
                    <span className="listclass-title ml-10" style={{ color: '#00b050' }}>Bộ lọc</span>
                </div> */}

                <div className="mt-20">
                    <Row className="mb-3">
                        <Col>
                            <DropdownCheckbox
                                options={subjects}
                                field="subjectChoose"
                                onChange={handleTempSelect}
                                title="Chọn môn học"
                            />
                        </Col>

                        <Col>
                            <DropdownCheckbox
                                options={grades}
                                field="gradeChoose"
                                onChange={handleTempSelect}
                                title="Chọn cấp học"
                            />
                        </Col>

                        <Col>
                            <DropdownRadio
                                options={typeTutor}
                                field="typeTutorChoose"
                                onChange={handleTempSelect}
                                title="Chọn yêu cầu"
                            />
                        </Col>

                        <Col>
                            <DropdownRadio
                                options={typeGender}
                                field="typeGenderChoose"
                                onChange={handleTempSelect}
                                title="Chọn giới tính"
                            />
                        </Col>

                        <Col>
                            <DropdownCheckbox
                                options={districts}
                                field="districtChoose"
                                onChange={handleTempSelect}
                                title="Chọn khu vực"
                            />
                        </Col>

                        <Col xs={1} style={{ textAlign: "right" }}>
                            <Button style={{ width: "100%", backgroundColor: "#00b050" }} onClick={handleApply}>Lọc</Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="mt-4">
                <Row>
                    <Col>
                        <span className="listclass-title">Bộ lọc đã được chọn:</span>
                        <ul>
                            <li><p>Các môn học: {tempSelectedValues.subjectChoose.join(', ')}</p></li>
                            <li><p>Các cấp học: {tempSelectedValues.gradeChoose.join(', ')}</p></li>
                            <li><p>Các yêu cầu: {tempSelectedValues.typeTutorChoose.join(', ')}</p></li>
                            <li><p>Các yêu cầu: {tempSelectedValues.typeGenderChoose.join(', ')}</p></li>
                            <li><p>Các khu vực: {tempSelectedValues.districtChoose.join(', ')}</p></li>
                        </ul>
                    </Col>
                    <Col style={{textAlign: "right"}}> 
                        <Button style={{ width: "30%", backgroundColor: "#00b050" }} onClick={handleResetFilter}>Đặt lại bộ lọc</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default SearchArea;
