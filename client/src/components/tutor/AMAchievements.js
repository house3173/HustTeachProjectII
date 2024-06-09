import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import AMAchievementsCheckBoxWithInput from './AMAchievementsCheckBoxWithInput';
import { TutorContext } from '../../contexts/tutorContext';

const AMAchievements = () => {
  const { tutorState, dispatch, saveTutorAchi, getTutorAchi } = useContext(TutorContext);

  let checkboxes = [
    { id: 1, label: 'Có môn đạt 9 điểm trở lên khi thi Đại học' },
    { id: 2, label: 'Cấp 3 theo học trường chuyên' },
    { id: 3, label: 'Đạt giải tại các kỳ thi cấp tỉnh và khu vực' },
    { id: 4, label: 'Đạt giải tại các kỳ thi cấp quốc gia, quốc tế' },
    { id: 5, label: 'Có chứng chỉ quốc tế' },
    { id: 6, label: 'Từng đạt học bổng đại học' },
    { id: 7, label: 'Giảng dạy tại trường chuẩn quốc gia' },
    { id: 8, label: 'Có kinh nghiệm gia sư trước đây' }
  ];

  const initialFormData = checkboxes.reduce((acc, checkbox) => {
    acc[checkbox.id] = { checked: false, inputValue: '' };
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const tutor = JSON.parse(localStorage.getItem('currentTutor'));
      try {
        const responseData = await getTutorAchi(tutor);
        if (responseData.success) {
          const tutorAchi = responseData.existingTutorAchi;
          const newFormData = { ...formData };

          checkboxes.forEach(checkbox => {
            const tutorAchiKey = `tutorAchi${checkbox.id}`;
            if (tutorAchi[tutorAchiKey] !== null &&  tutorAchi[tutorAchiKey] !== '') {
              newFormData[checkbox.id] = { checked: true, inputValue: tutorAchi[tutorAchiKey] };
            }
          });

          setFormData(newFormData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleCheckboxChange = (id, checked, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: { checked, inputValue }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = Object.keys(formData).reduce((acc, key) => {
      if(formData[key].inputValue) {
        acc[key] = formData[key].inputValue;
      } else {
        acc[key] = ''
      }
      return acc;
    }, {});

    console.log(dataToSubmit)
    try {
      const saveAchiRes = await saveTutorAchi(dataToSubmit);
      if (saveAchiRes.success) {
        dispatch({ type: 'RESET_AM_TAG', payload: { am_tag: 'RegisterClass' } });
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-20">
        <span className="span-css-blue-16 mb-20" style={{ fontSize: '18px', fontWeight: '700' }}>Thành tích</span>
      </div>
      <div>
        <Form>
          {checkboxes.map(checkbox => (
            <AMAchievementsCheckBoxWithInput
              key={checkbox.id}
              id={checkbox.id}
              label={checkbox.label}
              onChange={handleCheckboxChange}
              checkedBox={formData[checkbox.id].checked}
              inputValue={formData[checkbox.id].inputValue}
            />
          ))}
          <Button variant="primary" onClick={handleSubmit}>
            Hoàn thành
          </Button>
        </Form>
      </div>
      <ToastContainer style={{ position: 'fixed', top: '50px', right: '0px' }}>
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

export default AMAchievements;
