import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../contexts/constants";
import { Col, Container, Row } from "react-bootstrap";

const ModalInfo = ({tutorId}) => {

    const [selectedTutor, setSelectedTutor] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}/tutor/getTutor/${tutorId}`)
            .then(response => {
                if(response.data.success) {
                    setSelectedTutor(response.data.selectedTutor)
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [tutorId])

    return (
        <>
        {selectedTutor && (
            <div>
                <div>
                    <p><strong>Thông tin cơ bản</strong></p>
                    <Container>
                        <Row>
                            <Col><p>{`Họ và tên: ${selectedTutor.tutorName}`}</p></Col>
                            <Col><p>{`Giới tính: ${selectedTutor.tutorGender}`}</p></Col>
                        </Row>
                        <Row>
                            <Col><p>{`Năm sinh: ${selectedTutor.tutorYear}`}</p></Col>
                            <Col><p>{`Hiện đang là: ${selectedTutor.tutorType}`}</p></Col>
                        </Row>
                        <Row>
                            <Col><p>{`Đại học: ${selectedTutor.tutorUni}`}</p></Col>
                            <Col><p>{`Chuyên ngành: ${selectedTutor.tutorMajor}`}</p></Col>
                        </Row>
                        <Row>
                            <Col><p>{`Thời gian bắt đầu học: ${selectedTutor.tutorStart}`}</p></Col>
                            <Col><p>{`Thời gian kết thúc học: ${selectedTutor.tutorEnd}`}</p></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )}
        </>
    )
}

export default ModalInfo