import React, { useState, useEffect, useContext} from 'react';
import { Container, Row, Col, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';
import { TutorContext } from '../../contexts/tutorContext';

// Sample data arrays
// const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English'];
// const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
// const districts = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6'];


const AMRegisterClass = () => {
  const {tutorState, dispatch, saveTutorSuitable} = useContext(TutorContext)

  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    subjects: [],
    grades: [],
    districts: [],
  });

    const [subjects, setSubjects] = useState(['Math', 'Physics', 'Chemistry', 'Biology', 'English']);
    // const [districts, setDistricts] = useState([]);
    const districts = ['Thanh Xuân', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hà Đông', 'Hoàn Kiếm', 'Ba Đình', 'Tây Hồ', 'Long Biên'];
    const grades = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];
    
        useEffect(() => {

            // Fetch subjects from your API
            axios.get(`${apiUrl}/subject/getAll`)
                .then(response => {
                    if(response.data.success) {
                      const subjectNames = response.data.subjects.map(subject => subject.subjectName);
                      setSubjects(subjectNames);
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
    
            // // Fetch districts from Hanoi API
            // axios.get('https://api.example.com/hanoi-districts') // Thay URL này bằng URL thực tế của API
            //     .then(response => {
            //         setDistricts(response.data);
            //     })
            //     .catch(error => {
            //         console.error('Error fetching districts:', error);
            //     });

        }, []);

        useEffect(() => {
          const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));

          axios.post(`${apiUrl}/tutor/getSuitable`, currentTutor)
                .then(response => {
                    if(response.data.success) {
                      const tutorSuitable = response.data.existingTutorSuitable;
                      const subjectsCopy = response.data.subjects.map(subject => subject.subjectName);
                      const listSubjects = subjectsCopy.filter((subject, index) => tutorSuitable.tutorListSubject[index] === '1');
                      const listGrades = grades.filter((grade, index) => tutorSuitable.tutorListGrade[index] === '1');
                      const listDistricts = districts.filter((district, index) => tutorSuitable.tutorListDistrict[index] === '1');
                      
                      console.log({
                        subjects: listSubjects,
                        grades: listGrades,
                        districts: listDistricts,
                      })

                      setFormData({
                        subjects: listSubjects,
                        grades: listGrades,
                        districts: listDistricts,
                      })
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }, [])

  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => {
      const updatedCategory = checked
        ? [...prevFormData[category], name]
        : prevFormData[category].filter((item) => item !== name);
      return { ...prevFormData, [category]: updatedCategory };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const tutorListSubject = subjects.map(subject => formData.subjects.includes(subject) ? '1' : '0').join('');
    const tutorListGrade = grades.map(grade => formData.grades.includes(grade) ? '1' : '0').join('');
    const tutorListDistrict = districts.map(district => formData.districts.includes(district) ? '1' : '0').join('');
    console.log(formData);
    
    const tutorSuitable = {
      tutorListSubject: tutorListSubject,
      tutorListGrade: tutorListGrade,
      tutorListDistrict: tutorListDistrict
    }

    console.log(tutorSuitable)

        try {
            const saveSuitable = await saveTutorSuitable(tutorSuitable);
            console.log(saveSuitable)
            if(saveSuitable.success) {
                dispatch({type: "RESET_AM_TAG", payload : {am_tag: 'ManageClasses'}})
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);


        } catch (error) {
            console.log(error);
        }
  };

  const renderCheckboxes = (items, category) => (
    items.map((item) => (
      <Col xs={4} md={2} key={item}>
        <Form.Check
          type="checkbox"
          label={item}
          name={item}
          onChange={(e) => handleCheckboxChange(e, category)}
          checked={formData[category].includes(item)}
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
        
                  <ToastContainer style={{position: 'fixed', top: '50px', right: '0px'}} >
                        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Thông báo</strong>
                            </Toast.Header>
                            <Toast.Body>Thông tin đã được lưu thành công.</Toast.Body>
                        </Toast>
                    </ToastContainer>
    </div>
  );
};

export default AMRegisterClass;
