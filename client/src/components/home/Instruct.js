import { Col, Container, Row, Breadcrumb, Table } from "react-bootstrap"
import hust from '../../assets/images/hust.jpg'
import image_1 from '../../assets/image_instruct/image_1.png'
import image_2 from '../../assets/image_instruct/image_2.png'
import image_3 from '../../assets/image_instruct/image_3.png'
import image_4 from '../../assets/image_instruct/image_4.png'
import image_5 from '../../assets/image_instruct/image_5.png'
import image_6 from '../../assets/image_instruct/image_6.png'
import image_7 from '../../assets/image_instruct/image_7.png'
import image_8 from '../../assets/image_instruct/image_8.png'
import image_9 from '../../assets/image_instruct/image_9.png'
import image_10 from '../../assets/image_instruct/image_10.png'

const Instruct = () => {
    const subjects = [
        { subjectName: "Toán học", subjectFee: 80 },
        { subjectName: "Vật lý", subjectFee: 80 },
        { subjectName: "Hóa học", subjectFee: 80 },
        { subjectName: "Sinh học", subjectFee: 80 },
        { subjectName: "Tin học", subjectFee: 80 },
        { subjectName: "Văn học", subjectFee: 70 },
        { subjectName: "Tiếng Anh", subjectFee: 90 },
        { subjectName: "Lịch sử", subjectFee: 60 },
        { subjectName: "Địa lý", subjectFee: 60 },
        { subjectName: "Luyện viết", subjectFee: 90 },
        { subjectName: "Năng khiếu", subjectFee: 90 }
    ];


    return (
        <div style={{marginTop: "30px", marginBottom: "30px"}}>
            <Container>
                <Row>
                    <Col xs={3}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/trang-chu">Trang chủ</Breadcrumb.Item>
                            <Breadcrumb.Item active>Hướng dẫn và chính sách</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col xs={9} style={{marginTop: "20px"}}>
                        <div>
                            <span className="introduction-title">Hướng dẫn quy trình nhận lớp</span>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 1: Đăng ký tài khoản gia sư và hoàn thành bản thông tin</span>
                                <p className="introduction-sub-content ">
                                    Gia sư thực hiện chọn button "Đăng ký gia sư" tại trang chủ để chuyển đến trang đăng ký/đăng nhập. Vói lần đầu đăng ký, 
                                    gia sư cần hoàn thành bản thông tin
                                </p>
                                
                                <img src={image_1} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                                <img src={image_2} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 2: Tìm kiếm lớp và đăng ký</span>
                                <p className="introduction-sub-content ">
                                    Gia sư chọn vào mục "Danh sách lớp mới" hoặc "Lớp phù hợp", ở đây sẽ hiển thị danh sách các lớp đang cần tìm gia sư.
                                    Gia sư chọn lớp phù hợp, chọn button "Xem chi tiết" và tiến hành đăng ký
                                </p>
                                
                                <img src={image_3} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                                <img src={image_4} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 3: Chờ xác nhận và phản hồi</span>
                                <p className="introduction-sub-content ">
                                    Sau khi đăng ký, lớp sẽ được thêm trong danh mục "Quản lý lớp học" của Quản lý tài khoản. Ở đây sẽ hiển thị danh sách 
                                    các lớp bạn đã đăng ký, bạn đang dạy hoặc kết thúc. Bạn có thể dễ dàng theo dõi lớp.
                                </p>
                                
                                <img src={image_5} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 4: Lớp bắt đầu thực hiện</span>
                                <p className="introduction-sub-content ">
                                    Khi lớp ở trạng thái "Đang dạy" đồng nghĩa bạn và phụ huynh kết nối thành công. Trong quá trình dạy học, bạn cần chú ý thêm 
                                    ghi chú cho mỗi buổi học sau khi buổi học đó kết thúc.
                                </p>
                                
                                <img src={image_6} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                        </div>

                        <div>
                            <span className="introduction-title">Hướng dẫn quy trình tìm kiếm gia sư</span>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 1: Đăng ký tài khoản phụ huynh</span>
                                <p className="introduction-sub-content ">
                                    Phụ huynh thực hiện chọn button "Đăng ký thuê gia sư" tại trang chủ để chuyển đến trang đăng ký/đăng nhập. 
                                </p>
                                
                                <img src={image_7} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 2: Thêm lớp mới</span>
                                <p className="introduction-sub-content ">
                                    Phụ huynh chọn mục "Thêm lớp mới" để bắt đầu, hệ thống sẽ hiển thị một form mà bạn cần hoàn thành. 
                                    Bám nút xác nhận và chờ nhân viên trung tâm liên hệ xác nhận.
                                </p>
                                
                                <img src={image_8} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 3: Theo dõi lớp, xác nhận gia sư</span>
                                <p className="introduction-sub-content ">
                                    Sau khi lớp bạn thêm được xác nhận, bạn có thể quản lý và theo dõi chúng ở mục "Quản lý lớp học". Ở đây, bạn có thể xác nhận 
                                    gia sư, chọn lựa gia sư phù hợp. 
                                </p>
                                
                                <img src={image_9} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            <div>
                                <span className="introduction-title introduction-sub-title">Bước 4: Lớp bắt đầu thực hiện</span>
                                <p className="introduction-sub-content ">
                                    Khi lớp ở trạng thái "Đang dạy" đồng nghĩa bạn và gia sư kết nối thành công. Trong quá trình học, bạn cần chú ý phản hồi lại
                                    các node của gia sư để hai bạn dễ trao đổi và có nội dung để ghi nhớ
                                </p>
                                
                                <img src={image_10} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                        </div>

                        <div>
                            <span className="introduction-title">Công thức tính phí buổi học</span>
                            <div>
                                
                                <p className="introduction-sub-content ">
                                    Để tiếp nối sưj uy tín của trung tâm và là nơi nhiều phụ huynh/gia sư tìm tới, đối với phụ huynh cần chấp thuận
                                    với gia sư mức lương tối thiểu được tính theo công thức dưới đây: 
                                </p>
                                <br></br>
                                
                                <p>Ta có bảng phí cơ bản theo môn học:</p>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tên môn học</th>
                                            <th>Phí môn học</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map((subject, index) => (
                                            <tr key={index}>
                                                <td>{subject.subjectName}</td>
                                                <td>{subject.subjectFee}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <p>Đối với phí khối học, thì khối 1 ứng với 10.000VND, khối 2 là 20.000VND, khối 3 là 30.000VND</p>
                                <p>Đối với phí kinh nghiệm, thì bằng số năm kinh nghiệm nhân với 20.000VND</p>
                                <p>Đối với sinh viên tính phí ban đầu là 50.000VND, giáo viên là 200.000 VND. </p>

                                <p>Tổng kết, ta có chi phí tối thiểu cho 1 buổi học như sau: Phí buổi học = Phí SV/GV + phí môn học 
                                        + phí khối học + thời gian x 10 + phí phụ huynh hỗ trợ + phí kinh ngiệm.
                                </p>
                                <img src={hust} alt="ntroduce-hustteach" style={{width:"100%", height:"auto", margin: "20px 0"}}></img>
                            </div>
                            
                        </div>

                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Instruct