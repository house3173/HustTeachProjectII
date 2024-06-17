import book from '../../assets/images/books.png'
import location from '../../assets/images/location-black.png'
import dollar from '../../assets/images/dollar.png'
import check from '../../assets/images/check-mark.png'
import { ClassContext } from '../../contexts/classContext'
import { classReducer } from '../../reducers/classReducer'
import { useContext, useEffect, useReducer} from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import convertRequire from '../../utils/convertRequire'


const SingleClass = ({singleClass}) => {

    const {classState, dispatch} = useContext(ClassContext)

    const navigate = useNavigate()

    const getDetail = () => {
        dispatch({type: "DETAIL_CLASS", payload: singleClass})
        // console.log(classState.class);
        navigate('/chi-tiet-lop');
    }

        const classFeeStr =  singleClass.classFee.map(fee => (fee*8000).toString() + ' đồng').join(' hoặc ')

    return (
        <div className='singleclass-card'>
            <p className="singleclass-card-idclass">{singleClass.classId}</p>
            <div className="singleclass-card-content">
                    <div className='mt-10'>
                        <img src={book} alt='subject' width="20px" height="20px" className='mr-10'></img>
                        <span><strong>{`${singleClass.classSubject} - ${singleClass.classGrade}`}</strong></span>
                    </div>
                    <div className='mt-10'>
                        <img src={location} alt='location' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${singleClass.classAddress.addressDetail}, ${singleClass.classAddress.addressDistrict}, Hà Nội`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={dollar} alt='money' width="20px" height="20px" className='mr-10'></img>
                        <span>{`${classFeeStr}/buổi, ${singleClass.classSession} buổi/tuần`}</span>
                    </div>
                    <div className='mt-10'>
                        <img src={check} alt='require' width="20px" height="20px" className='mr-10'></img>
                        <span>{`Yêu cầu: ${singleClass.classRequireDetail.classRequireTypeTutor} - 
                                        ${singleClass.classRequireDetail.classRequireGender} - 
                                        ${singleClass.classRequireDetail.classRequireExper} năm kinh nghiệm `}
                        </span>
                    </div>
                <div className='mt-20 mb-10' style={{textAlign: "right"}}>
                    <Button style={{color: "white", backgroundColor:"#00b050"}} onClick={getDetail}>Xem chi tiết</Button>
                </div>
            </div>

        </div>
    )
}

export default SingleClass