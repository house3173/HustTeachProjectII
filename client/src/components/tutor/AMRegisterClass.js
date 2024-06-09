import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Sample data arrays
const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Math', 'Physics', 'Chemistry', 'Biology', 'English'];
const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
const districts = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6'];

const AMRegisterClass = () => {
  const [formData, setFormData] = useState({
    subjects: [],
    grades: [],
    districts: [],
  });

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => {
      const updatedCategory = checked
        ? [...prevFormData[category], name]
        : prevFormData[category].filter((item) => item !== name);
      return { ...prevFormData, [category]: updatedCategory };
    });
  };

  const handleFormSubmit = () => {
    console.log(formData);
  };

  const renderCheckboxes = (items, category) => (
    items.map((item) => (
      <Col xs={4} md={2} key={item}>
        <Form.Check
          type="checkbox"
          label={item}
          name={item}
          onChange={(e) => handleCheckboxChange(e, category)}
        />
      </Col>
    ))
  );

  return (
    <div>
        <div className="mb-20">
            <span className="span-css-blue-16 mb-20" style={{fontSize: "18px", fontWeight: '700'}}>Đăng ký lớp phù hợp</span>
        </div>

        <Container>
            <Form>
                <div className="mb-10 mt-20">
                    <span className="span-css-blue-16 mb-10" style={{fontSize: "16px", fontWeight: '700'}}>1. Môn học có thể giảng dạy</span>
                </div>
                    <Row>
                    {renderCheckboxes(subjects, 'subjects')}
                    </Row>

                <div className="mb-10 mt-20">
                    <span className="span-css-blue-16 mb-10" style={{fontSize: "16px", fontWeight: '700'}}>2. Lớp học có thể dạy</span>
                </div>
                    <Row>
                    {renderCheckboxes(grades, 'grades')}
                    </Row>
                <div className="mb-10 mt-20">
                    <span className="span-css-blue-16 mb-10" style={{fontSize: "16px", fontWeight: '700'}}>3. Khu vực có thể dạy</span>
                </div>
                    <Row>
                    {renderCheckboxes(districts, 'districts')}
                    </Row>
                <div className="text-right mt-3">
                    
                <Button variant="primary" onClick={handleFormSubmit}>
                    Hoàn thành
                </Button>
                </div>
            </Form>
        </Container>
        
    </div>
  );
};

export default AMRegisterClass;
