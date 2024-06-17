import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import clock from '../../assets/images/clock.png'

import convertTime from "../../utils/convertTime";
import { Container, Row, Col } from "react-bootstrap";

const ClassInfoCard = ({selectedClass, type}) => {
    const classFeeStr =  selectedClass.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')

    if(type === "full") {
        return (
            <Container>
                                <div className='mt-10'>
                                    <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                                    <span><strong>{`${selectedClass.classSubject} - ${selectedClass.classGrade}`}</strong></span>
                                </div>
                                <div className='mt-10'>
                                    <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`${selectedClass.classAddress.addressDetail}, ${selectedClass.classAddress.addressDistrict}, Hà Nội`}</span>
                                </div>
                                <div className='mt-10'>
                                    <img src={dollar} alt='money' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`${classFeeStr}/buổi, ${selectedClass.classSession} buổi/tuần`}</span>
                                </div>
                                <div className='mt-10'>
                                    <img src={check} alt='require' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`Yêu cầu: ${selectedClass.classRequireDetail.classRequireTypeTutor} - 
                                                    ${selectedClass.classRequireDetail.classRequireGender} - 
                                                    ${selectedClass.classRequireDetail.classRequireExper} năm kinh nghiệm `}
                                    </span>
                                </div>
                                <div className='mt-10'>
                                    <img src={clock} alt='time' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`Thời gian học: ${convertTime(selectedClass.classTime)}`}</span>
                                </div>
            </Container>       
        )
    } else {
        if(type === "small") {
            return (
                <Container style={{marginTop: '-1rem'}}>
                                <Row>
                                    <Col>
                                        <div className='mt-10'>
                                            <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                                            <span><strong>{`${selectedClass.classSubject} - ${selectedClass.classGrade}`}</strong></span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='mt-10'>
                                            <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                                            <span>{`${selectedClass.classAddress.addressDetail}, ${selectedClass.classAddress.addressDistrict}, Hà Nội`}</span>
                                        </div>
                                    </Col>
                                </Row>
                </Container>  
            )
        } else {
            return (
            <div>
                <div className='mt-10'>
                    <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                    <span><strong>{`${selectedClass.classSubject} - ${selectedClass.classGrade}`}</strong></span>
                </div>
                <Container>
                    <Row>
                        <Col xs={4} >
                                <div className='mt-10'>
                                    <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`${selectedClass.classAddress.addressDetail}, ${selectedClass.classAddress.addressDistrict}, Hà Nội`}</span>
                                </div>
                                <div className='mt-10'>
                                    <img src={dollar} alt='money' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`${classFeeStr}/buổi, ${selectedClass.classSession} buổi/tuần`}</span>
                                </div>
                        </Col>
                        <Col xs={8} >
                                <div className='mt-10'>
                                    <img src={check} alt='require' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`Yêu cầu: ${selectedClass.classRequireDetail.classRequireTypeTutor} - 
                                                    ${selectedClass.classRequireDetail.classRequireGender} - 
                                                    ${selectedClass.classRequireDetail.classRequireExper} năm kinh nghiệm `}
                                    </span>
                                </div>
                                <div className='mt-10'>
                                    <img src={clock} alt='time' width="20px" height="20px" className='mr-10'></img>
                                    <span>{`Thời gian học: ${convertTime(selectedClass.classTime)}`}</span>
                                </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            )
        }
    }
}

export default ClassInfoCard