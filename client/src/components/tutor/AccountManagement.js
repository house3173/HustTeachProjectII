import { Col, Container, Row, Form, Button, FloatingLabel} from "react-bootstrap"
import { useEffect, useState } from "react";
import play from '../../assets/images/play.png'
import AMBasicInfo from "./AMBasicInfo";
import AMAchievements from "./AMAchievements";
import AMRegisterClass from "./AMRegisterClass";
import AMManageClasses from "./AMManageClasses";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

const AccountManagement = () => {
    
    // const tutorState = JSON.parse(localStorage.getItem('tutorState'));
    let initTag = 'BasicInfo'
    // if(tutorState) {
    //     initTag = tutorState
    // }
    const [activeTab, setActiveTab] = useState(initTag);

    const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
    const tutorId = currentTutor.tutorId;
    const [listClass, setListClass] = useState([])
    const [listWaitClass, setListWaitClass] = useState([])
    const [itemClassId, setItemClassId] = useState()
 
    useEffect(() => {
        const fetchClasses = async () => {
          try {
            const [waitClassesResponse, tutorClassesResponse] = await Promise.all([
              axios.get(`${apiUrl}/waitclass/getAll/${tutorId}`),
              axios.get(`${apiUrl}/classes/getAllByTutor/${tutorId}`)
            ]);
    
            if (waitClassesResponse.data.success && tutorClassesResponse.data.success) {
              const combinedClasses = [
                ...waitClassesResponse.data.listWaitClasses,
                ...tutorClassesResponse.data.tutorClasses
              ];
              setListClass(combinedClasses);
              setListWaitClass(waitClassesResponse.data.tutorWaitClasses);
              setItemClassId(combinedClasses[0].classId)
            }
          } catch (error) {
            console.error('Error fetching classes:', error);
          }
        };
    
        fetchClasses();
    }, []);

    const handleDetailClass = (classId) => {
        setActiveTab('ManageClasses')
        setItemClassId(classId)
        console.log(classId);
    }

    const renderContent = () => {
      switch (activeTab) {
        case 'BasicInfo':
          return <AMBasicInfo />;
        case 'Achievements':
          return <AMAchievements />;
        case 'RegisterClass':
          return <AMRegisterClass />;
        case 'ManageClasses':
            
            const selectedItemClass = listClass.find(itemClass => itemClass.classId === itemClassId);
            console.log(selectedItemClass)
            return <AMManageClasses selectedClass={selectedItemClass} listWaitClass={listWaitClass}/>;
        default:
          return <AMBasicInfo />;
      }
    };

    // useEffect(() => {}, [activeTab])
    return (
        <Container>
            <div className="listclass-title mt-30 mb-20"><span >Quản lý tài khoản</span></div>
            <Row>
                <Col xs={3}>
                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px', cursor:'pointer'}} >
                            <span onClick={() => setActiveTab('BasicInfo')}>Hồ sơ gia sư</span>
                        </div>
                        <div style={{cursor:'pointer'}}>
                            <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                            <span className="span-css-blue-16" onClick={() => setActiveTab('BasicInfo')}>Thông tin cơ bản</span>
                        </div>
                        <div style={{cursor:'pointer'}}>
                            <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                            <span className="span-css-blue-16" onClick={() => setActiveTab('Achievements')}>Thành tích</span>
                        </div>

                    </div>

                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px', cursor:'pointer'}} >
                            <span onClick={() => setActiveTab('RegisterClass')}>Đăng ký lớp phù hợp</span>
                        </div>
                    </div>

                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px', cursor: 'pointer'}} >
                            <span onClick={() => setActiveTab('ManageClasses')}>Quản lý lớp học</span>
                        </div>
                        {
                            listClass.map((itemClass) => (
                                <div key={itemClass.classId} style={{cursor: 'pointer'}}>
                                    <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                                    <span 
                                        className="span-css-blue-16" 
                                        onClick={() => handleDetailClass(itemClass.classId)}
                                    >
                                            {itemClass.classId}
                                    </span>
                                </div>
                              ))
                        }
                    </div>
                </Col>

                <Col xs={9}>
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    )
}

export default AccountManagement