import axios from "axios";
import { useEffect, useState } from "react"
import { apiUrl } from "../../contexts/constants";
import ClassInfoCard from "../classes/ClassInfoCard";
import { ProgressBar } from "react-bootstrap";
import convertDate from "../../utils/convertDate";
import openbook from '../../assets/images/open-book.png'
import ManageFindingClass from "./ManageFindingClass";

const EndingClassInfo = ({selectedItemClass, parentsInfo, tutorInfo}) => {
    const [evaluteTutor, setEvaluteTutor] = useState(null)
    const [listNodeClass, setListNodeClass] = useState(null)

    useEffect(() => {
        console.log('load evalute ending class')
        axios.get(`${apiUrl}/evalutetutor/getEvalute/${selectedItemClass.classId}`)
            .then(response => {
                if(response.data.success) {
                  setEvaluteTutor({
                    ...evaluteTutor,
                    "tutorGrade": response.data.evaluteTutor.tutorGrade,
                    "feedBack": response.data.evaluteTutor.feedBack
                  })
                } else {
                    if(response.data.type === 'none') {
                        setEvaluteTutor(null)
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [selectedItemClass.classId]);

    useEffect(() => {
        console.log('load nodeClassList ending class')
        if(selectedItemClass.classId) {
            axios.get(`${apiUrl}/nodeclass/getAllByClassId/${selectedItemClass.classId}`)
                .then(response => {
                    if(response.data.success) {
                        let nodeClassList = response.data.nodeClassList;
                        nodeClassList.sort((a, b) => new Date(b.nodeDate) - new Date(a.nodeDate));
                        setListNodeClass(nodeClassList)
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                });
        }
    }, [selectedItemClass.classId]);

    return (
        <div>
            <div className="mb-10 mt-20" >
                <div style={{ color: '#156082' }}><strong>{`Xem chi tiết lớp ${selectedItemClass.classId}`}</strong></div>
                <p style={{ color: '#156082' }}>{`Tình trạng: ${selectedItemClass.classStatus}`}</p>

                <div style={{ color: '#156082' }}>
                    <span><strong>Phụ huynh:</strong>{` ${parentsInfo.parentsId} - ${parentsInfo.parentsName}`}</span>
                </div>

                { tutorInfo && 
                <div style={{ color: '#156082' }}>
                    <span><strong>Gia sư:</strong>{` ${tutorInfo.tutorId} - ${tutorInfo.tutorName}`}</span>
                </div>   
                }             
            </div>

            <ClassInfoCard selectedClass={selectedItemClass} type={"full"} />

            {selectedItemClass.classStatus === 'Kết thúc' && evaluteTutor && 
                <div>
                    <div className="mb-10 mt-20" >
                        <span style={{ color: '#156082' }}><strong>Đánh giá của phụ huynh sau khi kết thúc gia sư</strong></span>
                    </div>

                        <div>
                            <ProgressBar style={{ minHeight: '20px' }} animated now={evaluteTutor.tutorGrade} label={`${evaluteTutor.tutorGrade}/100`} />
                            <div className="mt-10" style={{ padding: '20px', borderRadius: '10px', backgroundColor: "rgb(189, 227, 244)" }}>
                                <pre>{evaluteTutor.feedBack}</pre>
                            </div>
                        </div>
                    
                </div>
            }

            {listNodeClass && listNodeClass.length > 0 && 
                <div>
                    {
                        listNodeClass.map((nodeClass) => (
                            <div key={nodeClass.nodeId}>

                                <div className='mt-20' style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <img src={openbook} alt='openbook' width="20px" height="20px" className='mr-10'></img>
                                    <span style={{ color: '#00B050' }}><strong>{`Buổi dạy ngày ${convertDate(nodeClass.nodeDate)}`}</strong></span>
                                </div>
                                <ul>
                                    <li>
                                        {`Thời gian: ${nodeClass.nodeTime}`}
                                    </li>
                                    <li>
                                        {`Chủ đề buổi học: ${nodeClass.nodeTopic}`}
                                    </li>
                                    <li>
                                        {`Nhận xét về buổi học: ${nodeClass.nodeComment}`}
                                    </li>
                                    {nodeClass.nodeGrade &&
                                        <li>
                                            {`Điểm đánh giá của phụ huynh: ${nodeClass.nodeGrade}`}
                                        </li>
                                    }
                                    {nodeClass.nodeResponse &&
                                        <li>
                                            {`Phản hồi của phụ huynh: ${nodeClass.nodeResponse}`}
                                        </li>
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            }

            {selectedItemClass.classStatus === 'Đang tìm gia sư' && <ManageFindingClass currentClass={selectedItemClass}/>}

        </div>
    )
}

export default EndingClassInfo