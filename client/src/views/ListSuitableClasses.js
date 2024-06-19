import SearchArea from "../components/classes/SearchArea"
import Header from '../components/home/Header'
import NavbarMenu from '../components/home/NavbarMenu'
import Footer from '../components/home/Footer'
import { Container, Row, Col, Button } from "react-bootstrap"
import SingleClass from "../components/classes/SingleClass"
import { useContext, useEffect, useState } from 'react'
import { ActorContext } from '../contexts/actorContext'
import axios from "axios"
import { apiUrl } from "../contexts/constants"
import { useNavigate } from "react-router-dom"

const ListSuitableClasses = () => {
    const navigate = useNavigate()

    const {actorState, dispatch} = useContext(ActorContext)
    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));
    const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
    
    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }
    
    const [listClass, setListClass] = useState([])
    const [listSuitableClass, setListSuitableClass] = useState([])

    // useEffect(() => {
    //     setFilters({
    //         subjectChoose: [],
    //         gradeChoose: [],
    //         typeTutorChoose: [],
    //         typeGenderChoose: [],
    //         districtChoose: []
    //     })
    // }, [])

    // useEffect( () => {

    //     axios.get(`${apiUrl}/classes/suitableClass/${currentTutor.tutorId}`)
    //         .then(response => {
    //             if(response.data.success) {
    //                 console.log("Suitable classes: ", response.data.suitableClasses)
    //                 setListSuitableClass(response.data.suitableClasses);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching subjects:', error);
    //         });

    //     setFilters({
    //         subjectChoose: [],
    //         gradeChoose: [],
    //         typeTutorChoose: [],
    //         typeGenderChoose: [],
    //         districtChoose: []
    //     })

    // }, []); 

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

    // useEffect(() => {
    //     axios.post(`${apiUrl}/classes/filter`, filters)
    //         .then(response => {
    //             if(response.data.success) {
    //                 const filteredClasses = response.data.listClasses.filter(classItem => classItem.classStatus === 'Đang tìm gia sư');
    //                 const commonClasses = filteredClasses.filter(filteredClass =>
    //                     listSuitableClass.some(suitableClass => suitableClass.classId === filteredClass.classId)
    //                 );
    //                 console.log("Filter classes: ", filteredClasses);
    //                 console.log("Common classes: ", commonClasses);
    //                 setListClass(commonClasses);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching subjects:', error);
    //         });

    // }, [filters]); 

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
        
        axios.get(`${apiUrl}/classes/suitableClass/${currentTutor.tutorId}`)
            .then(response => {
                if (response.data.success) {
                    console.log("Suitable classes: ", response.data.suitableClasses);
                    const listSuitableClassTmp = response.data.suitableClasses
                    setListSuitableClass(listSuitableClassTmp);
    
                    // Gọi axios.post trong trường hợp này
                    axios.post(`${apiUrl}/classes/filter`, filters)
                        .then(response => {
                            if (response.data.success) {
                                const filteredClasses = response.data.listClasses.filter(classItem => classItem.classStatus === 'Đang tìm gia sư');
                                console.log("Filter classes: ", filteredClasses);
                                const commonClasses = filteredClasses.filter(filteredClass =>
                                    listSuitableClassTmp.some(suitableClass => suitableClass.classId === filteredClass.classId)
                                );
                                console.log("Common classes: ", commonClasses);
                                setListClass(commonClasses);
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching filtered classes:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching suitable classes:', error);
            });
    }, [currentTutor.tutorId, filters]);
    

    const tabList = {
        title: "Danh sách lớp phù hợp",
        type: "lớp phù hợp",
        href: "/danh-sach-lop",
        hrefContent: "Xem danh sách lớp mới"
    }

    return (
        <>
            {/* <Header roleHeader = 'mainHome'/> */}
            <Header roleHeader = {currentRoleActor}/>
            <NavbarMenu/>
            {(currentRoleActor === 'tutorMainHome') && 
                <>
                <SearchArea tabList={tabList} onApplyFilters={handleApplyFilters}/>
                <Container>
                    <Row>
                        <div><p><strong>{`Đang có ${listClass.length} lớp phù hợp`}</strong></p></div>
                        {listClass.map((singleClass) => (
                            <Col key={singleClass.classId} xs={12} sm={6} lg={3} className="mt-20">
                                <SingleClass singleClass={singleClass} />
                            </Col>
                        ))}
                    </Row>
                </Container>
                </>
            }

            {(currentRoleActor !== 'tutorMainHome') && 
                <Container style={{textAlign: "center"}}>
                    <div className='mb-20 mt-30'>
                        <span style={{color: "#00b050", fontSize: "26px"}}><strong>Bạn cần đăng nhập với tư cách gia sư để xem các lớp phù hợp!</strong></span>
                    </div>
                    <div style={{display: "flex", justifyContent: "center"}}>
                            <Button className='button-css' type="submit" style={{width: "50%"}}
                                onClick={() => setActorState('tutorLoginHome', '/dang-nhap')}
                            >
                                <strong>{`Chuyển đến trang đăng nhập gia sư`}</strong>
                            </Button>
                        </div>
                </Container>
            }
            <Footer/>
        </>
    )
}

export default ListSuitableClasses