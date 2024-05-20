import { Col, Container, Row, Form, Button, FloatingLabel} from "react-bootstrap"
import { useState } from "react";

const AMBasicInfo = () => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        profilePicturePreview: '',
        universityProof: null,
        fullName: '',
        phoneNumber: '',
        gender: '',
        birthYear: '',
        role: '',
        university: '',
        major: '',
        startTime: '',
        endTime: ''
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
          const file = files[0];
          if (name === 'profilePicture') {
            if (!file.type.startsWith('image/')) {
              alert('Vui lòng chọn một file ảnh hợp lệ.');
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData({
                ...formData,
                profilePicture: file,
                profilePicturePreview: reader.result
              });
            };
            reader.readAsDataURL(file);
          } else if (name === 'universityProof') {
            const proofUrl = URL.createObjectURL(file);
            setFormData({
              ...formData,
              universityProof: file,
              universityProofUrl: proofUrl
            });
          } else {
            setFormData({
              ...formData,
              [name]: file
            });
          }
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };

      const handleOpenProof = () => {
        if (formData.universityProofUrl) {
          window.open(formData.universityProofUrl, '_blank');
        } else {
          alert('Chưa có file minh chứng đại học được chọn.');
        }
      }; 

    return (
        <div>
            <Row>
                        <Col xs={5} style={{paddingRight: "60px"}}>
                            <div className="mb-20">
                                <span className="span-css-blue-16 mb-20" style={{fontSize: "18px", fontWeight: '700'}}>Thông tin cơ bản</span>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="profilePicture">
                                    <Form.Label>Ảnh hồ sơ</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        name="profilePicture"
                                        onChange={handleChange}
                                    />
                                    {formData.profilePicturePreview && (
                                        <img 
                                        src={formData.profilePicturePreview} 
                                        alt="Ảnh hồ sơ" 
                                        style={{ width: '100%', marginTop: '10px' }}
                                        />
                                    )}
                                </Form.Group>

                                <Form.Group controlId="universityProof" className="mt-20">
                                    <Form.Label>File minh chứng đại học</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        name="universityProof"
                                        onChange={handleChange}
                                    />
                                    {formData.universityProof && (
                                        <Button 
                                            variant="link" 
                                            onClick={handleOpenProof} 
                                            style={{ display: 'block', marginTop: '10px' }}
                                        >
                                            Xem file minh chứng
                                        </Button>
                                    )}
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={7} className="mt-30" style={{paddingLeft: "30px"}}>
                            <Form onSubmit={handleSubmit} className="mt-30">
                                <FloatingLabel controlId="fullName" label="Họ và tên" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập họ và tên" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="phoneNumber" label="Số điện thoại" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập số điện thoại" 
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="gender" label="Giới tính" className="mb-3">
                                    <Form.Select 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </Form.Select>
                                </FloatingLabel>

                                <FloatingLabel controlId="birthYear" label="Năm sinh" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập năm sinh" 
                                        name="birthYear"
                                        value={formData.birthYear}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <Form.Group>
                                    <div className="mb-10">
                                        <Form.Check
                                            inline
                                            label="Sinh viên"
                                            type="radio"
                                            name="role"
                                            value="Sinh viên"
                                            checked={formData.role === 'Sinh viên'}
                                            onChange={handleChange}
                                        />

                                        <Form.Check
                                            inline
                                            label="Giáo viên"
                                            type="radio"
                                            name="role"
                                            value="Giáo viên"
                                            checked={formData.role === 'Giáo viên'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>

                                <FloatingLabel controlId="university" label="Đại học" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập tên đại học" 
                                        name="university"
                                        value={formData.university}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="major" label="Ngành học" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập ngành học" 
                                        name="major"
                                        value={formData.major}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="startTime" label="Thời gian bắt đầu (mm/yyyy)" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="mm/yyyy" 
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="endTime" label="Thời gian kết thúc (mm/yyyy)" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="mm/yyyy" 
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>

                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" type="submit">
                                        Hoàn thành
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
        </div>
    )

}

export default AMBasicInfo