import SearchArea from "../components/classes/SearchArea"
import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Footer from '../components/home/Footer'
import { Container, Row, Col } from "react-bootstrap"
import SingleClass from "../components/classes/SingleClass"
import { useContext } from 'react'
import { ActorContext } from '../contexts/actorContext'

const ListSuitableClasses = () => {
    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    const oneClass = {
        classId: 'L5363',
        classStatus: 'Đang còn',
        classSubject: 'Toán học',
        classGrade: '10',
        classAddress: {
            addressDistrict: 'Hai Bà Trưng',
            addressDetail: 'Số 1 Đại Cồ Việt, phường Bách Khoa'
        },
        classFee: 200,
        classHour: 2,
        classSession: 2,
        classRequire: '002',
        parentsId: 'PH001',
        tutorId: '',
        staffId: 'NV001',
        classPercentFee: 30,
        classTime: {
            timeMoring: '2,3,5',
            timeAfternoon: '4,6',
            timeEvening: '2,3,5,6,7',
            timeDay: ''
        },
        classStudent: {
            studentGender: 'Nam',
            studentLevel: 'Khá, mức 8 điểm',
            studentSchool: 'Trường THPT Tạ Quang Bửu',
            studentAddInfo: '..........',
            studentGoal: 'Mục tiêu 9 điểm'
        },

    }

    const tabList = {
        title: "Danh sách lớp phù hợp",
        numberClass: 10,
        type: "lớp phù hợp",
        href: "/danh-sach-lop",
        hrefContent: "Xem danh sách lớp mới"
    }
    
    const listClass = Array(10).fill(oneClass);

    return (
        <>
            {/* <Header roleHeader = 'mainHome'/> */}
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <SearchArea tabList={tabList}/>
            <Container>
                <Row>
                    {listClass.map((singleClass) => (
                        <Col key={singleClass.classId} xs={12} sm={6} lg={3} className="mt-20">
                            <SingleClass singleClass={singleClass} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default ListSuitableClasses