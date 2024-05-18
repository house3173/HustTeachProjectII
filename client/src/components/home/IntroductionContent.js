import { Col, Container, Row, Breadcrumb } from "react-bootstrap"
import hust from '../../assets/images/hust.jpg'
const IntroductionContent = () => {
    return (
        <div style={{marginTop: "30px", marginBottom: "30px"}}>
            <Container>
                <Row>
                    <Col xs={3}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/trang-chu">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item active>Giới thiệu</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xs={9} style={{marginTop: "20px"}}>
                        <span className="introduction-title">Giới thiệu về HustTeach</span>
                        <div>
                            <span className="introduction-title introduction-sub-title">Giới thiệu sơ lược</span>
                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                            
                            <img src={hust} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>

                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                        </div>

                        <div>
                            <span className="introduction-title introduction-sub-title">Giới thiệu sơ lược</span>
                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                            
                            <img src={hust} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>

                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                        </div>

                        <div>
                            <span className="introduction-title introduction-sub-title">Giới thiệu sơ lược</span>
                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                            
                            <img src={hust} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>

                            <p className="introduction-sub-content ">
                            Trung tâm gia sư HustTeach là dự án được xây dựng bởi Đại học Bách Khoa Hà Nội và TeachEducation Việt Nam. Trong đó, Đại học Bách Khoa cung cấp hệ thống công nghệ quản lý mạnh mẽ và hiện đại, TeachEducation chịu trách nhiệm về kiến thức chuyên môn.
                            <br></br><br></br>
                            Bên cạnh thế mạnh của mỗi công ty, Trung tâm gia sư HustTeach còn có đội ngũ nhân viên được đào tạo bài bản, có đầy đủ kiến thức và kỹ năng tuyển chọn nhân sự trong ngành giáo dục.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default IntroductionContent