import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import AMAchievementsCheckBoxWithInput from './AMAchievementsCheckBoxWithInput';

const AMAchievements = () => {
    const checkboxes = [
        { id: 1, label: 'Có môn đạt 9 điểm trở lên khi thi Đại học' },
        { id: 2, label: 'Cấp 3 theo học trường chuyên' },
        { id: 3, label: 'Đạt giải tại các kỳ thi cấp tỉnh và khu vực' },
        { id: 4, label: 'Đạt giải tại các kỳ thi cấp quốc gia, quốc tế' },
        { id: 5, label: 'Có chứng chỉ quốc tế' },
        { id: 6, label: 'Từng đạt học bổng đại học' },
        { id: 7, label: 'Giảng dạy tại trường chuẩn quốc gia' },
      ];

      // Tạo đối tượng khởi tạo với mỗi id có giá trị null
    const initialFormData = checkboxes.reduce((acc, checkbox) => {
        acc[checkbox.id] = null;
        return acc;
    }, {});

      const [formData, setFormData] = useState(initialFormData)

      const handleCheckboxChange = (id, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    
      const handleSubmit = () => {
        console.log('Form Data:', formData);
      };
      
    return (
        <div>
            <div className="mb-20">
                <span className="span-css-blue-16 mb-20" style={{fontSize: "18px", fontWeight: '700'}}>Thành tích</span>
            </div>

            <div>
                <Form>
                    {checkboxes.map((checkbox) => (
                        <AMAchievementsCheckBoxWithInput 
                            key={checkbox.id} 
                            id={checkbox.id} 
                            label={checkbox.label} 
                            onChange={handleCheckboxChange} 
                        />
                    ))}

                    <Button variant="primary" onClick={handleSubmit}>
                        Hoàn thành
                    </Button>
            </Form>
            </div>

        </div>
    )
}

export default AMAchievements