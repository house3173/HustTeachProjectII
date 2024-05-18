import {Button, Container} from 'react-bootstrap'
import logo from '../../assets/images/logo2.png'
import phone_call from '../../assets/images/phone.png'

const Header = ({roleHeader}) => {
    let groupButtonHeader

    if(roleHeader === 'mainHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="light" size="sm" className='header-button-register' href='/'><strong>Đăng ký gia sư</strong></Button>
                    <Button variant="warning" size="sm" className='header-button-register' href='/'><strong>Đăng ký thuê gia sư</strong></Button>
                    <div>
                        <img style={{color: "white", width: "40px"}} src={phone_call} alt='phone'></img>
                        <span className='header-span' style={{textDecoration:"underline"}}>086-668-3956</span>
                    </div>
            </div>
        )
    } else if(roleHeader === 'tutorLoginHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="light" size="sm" className='header-button-register' href='/'><strong>Đăng ký làm gia sư</strong></Button>
                    <Button variant="light" size="sm" className='header-button-register' href='/'><strong>Đăng nhập tài khoản</strong></Button>
            </div>
        )
    } else if(roleHeader === 'tutorAndParentsMainHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="light" size="sm" className='header-button-register' href='/'><strong>Quản lý tài khoản</strong></Button>
                    <Button variant="warning" size="sm" className='header-button-register' href='/'><strong>Đăng xuất</strong></Button>
            </div>
        )
    } else if(roleHeader === 'staffMainHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="warning" size="sm" className='header-button-register' href='/'><strong>Đăng xuất</strong></Button>
            </div>
        )
    }


	return (
        <div style={{backgroundColor: "#00B050"}}>
            <Container className='header'>
                <div>
                    <img src={logo} alt='Logo HustTeach' width="60px"></img>
                    <span className='header-span' style={{fontSize: "25px"}}>HustTeach</span>
                </div>
                {groupButtonHeader}
            </Container>
        </div>
    )
}

export default Header