import { Col, Container, Row, Form, Button, FloatingLabel} from "react-bootstrap"
import { useEffect, useState } from "react";
import play from '../../assets/images/play.png'
import AMBasicInfo from "./AMBasicInfo";
import AMAchievements from "./AMAchievements";
import AMRegisterClass from "./AMRegisterClass";
import AMManageClasses from "./AMManageClasses";

const AccountManagement = () => {
    
    // const tutorState = JSON.parse(localStorage.getItem('tutorState'));
    let initTag = 'BasicInfo'
    // if(tutorState) {
    //     initTag = tutorState
    // }
    const [activeTab, setActiveTab] = useState(initTag);

    const renderContent = () => {
      switch (activeTab) {
        case 'BasicInfo':
          return <AMBasicInfo />;
        case 'Achievements':
          return <AMAchievements />;
        case 'RegisterClass':
          return <AMRegisterClass />;
        case 'ManageClasses':
          return <AMManageClasses />;
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
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px'}} >
                            <span onClick={() => setActiveTab('BasicInfo')}>Hồ sơ gia sư</span>
                        </div>
                        <div>
                            <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                            <span className="span-css-blue-16" onClick={() => setActiveTab('BasicInfo')}>Thông tin cơ bản</span>
                        </div>
                        <div>
                            <img src={play} alt="arrow right" className="image-css-16 ml-30 mr-10 mb-10"/>
                            <span className="span-css-blue-16" onClick={() => setActiveTab('Achievements')}>Thành tích</span>
                        </div>

                    </div>

                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px'}} >
                            <span onClick={() => setActiveTab('RegisterClass')}>Đăng ký lớp phù hợp</span>
                        </div>
                    </div>

                    <div>
                        <div className="listclass-title mb-10 ml-10" style={{color: "#00b050", fontSize: '18px'}} >
                            <span onClick={() => setActiveTab('ManageClasses')}>Quản lý lớp học</span>
                        </div>
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