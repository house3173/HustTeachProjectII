import SearchArea from "../components/classes/SearchArea"
import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Footer from '../components/home/Footer'
import { Container, Row, Col } from "react-bootstrap"
import SingleClass from "../components/classes/SingleClass"
import { useContext, useEffect, useState } from 'react'
import { ActorContext } from '../contexts/actorContext'
import axios from "axios"
import { apiUrl } from "../contexts/constants"

const ListClasses = () => {
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
        classFeeBonus: 50,
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
            studentLevel: 'Khá',
            studentSchool: 'Trường THPT Tạ Quang Bửu',
            studentAddInfo: '..........',
            studentGoal: 'Mục tiêu 9 điểm'
        },

    }
    
    const [listClass, setListClass] = useState([])
    const [filters, setFilters] = useState({
        subjectChoose: [],
        gradeChoose: [],
        typeTutorChoose: [],
        typeGenderChoose: [],
        districtChoose: []
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        console.log("Filters in ListClass: ", newFilters)
    }

    useEffect(() => {
        setFilters({
            subjectChoose: [],
            gradeChoose: [],
            typeTutorChoose: [],
            typeGenderChoose: [],
            districtChoose: []
        })
    }, [])

    useEffect(() => {

        axios.post(`${apiUrl}/classes/filter`, filters)
            .then(response => {
                if(response.data.success) {
                    const filteredClasses = response.data.listClasses.filter(classItem => classItem.classStatus === 'Đang tìm gia sư');
                    setListClass(filteredClasses);
                }
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });

    }, [filters]); 

    const tabList = {
        title: "Danh sách lớp mới",
        type: "lớp mới",
        href: "/danh-sach-lop-phu-hop",
        hrefContent: "Xem danh sách lớp phù hợp"
    }

    // const listClass = Array(10).fill(oneClass);

    return (
        <>
            {/* <Header roleHeader = 'mainHome'/> */}
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            <SearchArea tabList={tabList} onApplyFilters={handleApplyFilters} />
            <Container>
                <Row>
                    <div><p><strong>{`Đang có ${listClass.length} lớp`}</strong></p></div>
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

export default ListClasses