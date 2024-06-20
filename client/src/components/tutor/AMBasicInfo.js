import { Col, Container, Row, Form, Button, FloatingLabel, ToastContainer, Toast} from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ActorContext } from "../../contexts/actorContext"
import { TutorContext } from "../../contexts/tutorContext"
import AccountManagement from "./AccountManagement"

const AMBasicInfo = () => {
    const {tutorState, dispatch, saveTutorInfo, getTutorInfo} = useContext(TutorContext)
    const navigate = useNavigate()

    const [showToast, setShowToast] = useState(false);

    const initFormData = {
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
    };
    
    const [formData, setFormData] = useState(initFormData);
    
    useEffect(() => {
        async function fetchData() {
            const tutor = JSON.parse(localStorage.getItem('currentTutor'));
            console.log(tutor);
            try {
                const responseData = await getTutorInfo(tutor);
                console.log(responseData);
                if (responseData.success) {
                    const tutorInfo = responseData.existingTutorInfo;
                    setFormData({
                        profilePicture: tutorInfo.tutorImage,
                        universityProof: tutorInfo.tutorFileUni,
                        fullName: tutorInfo.tutorName,
                        phoneNumber: tutorInfo.tutorPhone,
                        gender: tutorInfo.tutorGender,
                        birthYear: tutorInfo.tutorYear,
                        role: tutorInfo.tutorType,
                        university: tutorInfo.tutorUni,
                        major: tutorInfo.tutorMajor,
                        startTime: tutorInfo.tutorStart,
                        endTime: tutorInfo.tutorEnd,
                    });
                    console.log(formData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    
    
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const saveInfoRes = await saveTutorInfo(formData);
            console.log(saveInfoRes)
            if(saveInfoRes.success) {
                dispatch({type: "RESET_AM_TAG", payload : {am_tag: 'Achievements'}})
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);


        } catch (error) {
            console.log(error);
        }
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
                        {/* <Col xs={5} style={{paddingRight: "60px"}}>
                           
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
                        </Col> */}
                        <Col  className="mt-30" style={{paddingLeft: "30px"}}>
                            <div className="mb-20">
                                <span className="span-css-blue-16 mb-20" style={{fontSize: "18px", fontWeight: '700'}}>Thông tin cơ bản</span>
                            </div>
                            <Form onSubmit={handleSubmit} className="mt-30">
                                <FloatingLabel controlId="fullName" label="Họ và tên" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập họ và tên" 
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="phoneNumber" label="Số điện thoại" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập số điện thoại" 
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="gender" label="Giới tính" className="mb-3">
                                    <Form.Select 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
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
                                        required
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
                                            required
                                        />

                                        <Form.Check
                                            inline
                                            label="Giáo viên"
                                            type="radio"
                                            name="role"
                                            value="Giáo viên"
                                            checked={formData.role === 'Giáo viên'}
                                            onChange={handleChange}
                                            required
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
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="major" label="Ngành học" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nhập ngành học" 
                                        name="major"
                                        value={formData.major}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="startTime" label="Thời gian bắt đầu (mm/yyyy)" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="mm/yyyy" 
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </FloatingLabel>

                                <FloatingLabel controlId="endTime" label="Thời gian kết thúc (mm/yyyy)" className="mb-3">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="mm/yyyy" 
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
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
                
                    <ToastContainer style={{position: 'fixed', top: '50px', right: '0px'}} >
                        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Thông báo</strong>
                            </Toast.Header>
                            <Toast.Body>Thông tin đã được lưu thành công.</Toast.Body>
                        </Toast>
                    </ToastContainer>

        </div>
    )

}

export default AMBasicInfo