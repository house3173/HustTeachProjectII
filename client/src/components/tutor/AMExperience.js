import React, { useState } from 'react';
import { Form, Button, Row, Col, FloatingLabel} from 'react-bootstrap';

const AMExperience = () => {
    const [hasExperience, setHasExperience] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleFormSubmit = () => {
        const formData = {
        hasExperience,
        additionalInfo
        };
        console.log(formData);
    };

    return (
        <div>
            <div className="mb-20">
                <span className="span-css-blue-16 mb-20" style={{fontSize: "18px", fontWeight: '700'}}>Kinh nghiệm</span>
            </div>

            <div>
                <Form>
                    <Form.Group as={Row} controlId="hasExperience">
                        <Form.Label column sm={12}>Bạn đã từng gia sư hoặc gỉang dạy trước đây</Form.Label>
                        <div></div>
                        <Col sm={8} className='ml-40 mb-20'>
                            <Form.Check
                                inline
                                type="radio"
                                id="hasExperience1"
                                label="Đã từng"
                                checked={hasExperience === 'yes'}
                                onChange={() => setHasExperience('yes')}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="hasExperience2"
                                label="Chưa từng"
                                checked={hasExperience === 'no'}
                                onChange={() => setHasExperience('no')}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="additionalInfo">
                        <FloatingLabel
                            label="Nhập thông tin các lớp bạn từng gia sư: 
                            (mỗi lớp gia sư trên 1 dòng)"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập thông tin các lớp bạn từng gia sư: 
                                            (mỗi lớp gia sư trên 1 dòng)"
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                style={{minHeight: "100px"}}
                            />
                        </FloatingLabel>
                    </Form.Group>

                    <div className="text-right">
                        <Button variant="primary" onClick={handleFormSubmit}>
                        Hoàn thành
                        </Button>
                    </div>
                </Form>
            </div>

        </div>
    )
}

export default AMExperience