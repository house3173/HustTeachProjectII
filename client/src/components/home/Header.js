import {Button, Container, Dropdown} from 'react-bootstrap'
import logo from '../../assets/images/logo2.png'
import phone_call from '../../assets/images/phone.png'
import down from '../../assets/images/down.png'
import profile from '../../assets/images/profile.png'
import { useContext } from 'react'
import { ActorContext } from '../../contexts/actorContext'
import { useNavigate } from 'react-router-dom'

const Header = ({roleHeader}) => {
    const navigate = useNavigate()

    const {actorState, dispatch} = useContext(ActorContext)

    let groupButtonHeader

    // const setActorState = () => {
    //     dispatch({type: "RESET_ACTOR", payload : 'tutorLoginHome'})
    //     navigate('/dang-ky')
    // }

    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }

    if(roleHeader === 'mainHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Dropdown>
                        <Dropdown.Toggle variant="light" size="sm" className='header-button-register'>
                            <strong>Đăng ký gia sư</strong>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setActorState('tutorLoginHome', '/dang-ky')} >
                              Đăng ký làm gia sư
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setActorState('tutorLoginHome', '/dang-nhap')} >
                                Đăng nhập tài khoản
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="warning" size="sm" className='header-button-register'>
                            <strong>Đăng ký thuê gia sư</strong>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setActorState('parentsLoginHome', '/dang-ky')}  >
                                Đăng ký thuê gia sư
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setActorState('parentsLoginHome', '/dang-nhap')} >
                                Đăng nhập tài khoản
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <img style={{color: "white", width: "40px"}} src={phone_call} alt='phone'></img>
                        <span className='header-span' style={{textDecoration:"underline"}}>086-668-3956</span>
                    </div>
            </div>
        )
    } else if(roleHeader === 'tutorLoginHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="light" size="sm" className='header-button-register' 
                        onClick={() => setActorState('tutorLoginHome', '/dang-ky')}
                    >
                        <strong>Đăng ký làm gia sư</strong>
                    </Button>
                    <Button variant="light" size="sm" className='header-button-register' 
                        onClick={() => setActorState('tutorLoginHome', '/dang-nhap')}
                    >
                        <strong>Đăng nhập tài khoản</strong>
                    </Button>
                    <div>
                        <img style={{color: "white", width: "40px"}} src={phone_call} alt='phone'></img>
                        <span className='header-span' style={{textDecoration:"underline"}}>086-668-3956</span>
                    </div>
            </div>
        )
    } else if(roleHeader === 'parentsLoginHome') {
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <Button variant="light" size="sm" className='header-button-register' 
                        onClick={() => setActorState('parentsLoginHome', '/dang-ky')}
                    >
                        <strong>Đăng ký thuê gia sư</strong>
                    </Button>
                    <Button variant="light" size="sm" className='header-button-register' 
                        onClick={() => setActorState('parentsLoginHome', '/dang-nhap')}
                    >
                        <strong>Đăng nhập tài khoản</strong>
                    </Button>
                    <div>
                        <img style={{color: "white", width: "40px"}} src={phone_call} alt='phone'></img>
                        <span className='header-span' style={{textDecoration:"underline"}}>086-668-3956</span>
                    </div>
            </div>
        )  
    }
    else if(roleHeader === 'tutorMainHome' || roleHeader === 'parentsMainHome') {
        const currentTutor = JSON.parse(localStorage.getItem('currentTutor'));
        const currentParents = JSON.parse(localStorage.getItem('currentParents'));
        let name
        let hrefQLTK
        if(currentTutor && roleHeader === 'tutorMainHome') {
            name = currentTutor.tutorName;
            hrefQLTK = 'gia-su'
        }
        if(currentParents && roleHeader === 'parentsMainHome') {
            name = currentParents.parentsName;
            hrefQLTK = 'phu-huynh'
        }
        groupButtonHeader = (
            <div className='header-register-contact'> 
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={profile} alt="avatar" 
                            style={{backgroundColor: "#646464", width: "36px", height: "36px", border: 'none', borderRadius: '50%'}} />
                        <div><span className='ml-10 mr-10' style={{color: 'white', fontSize: '21px'}}><strong>{`${name}`}</strong></span></div>
                        <img src={down} alt='' width="20px" height="20px"/>
                    </div>
                    <Button variant="light" size="sm" className='header-button-register' href={`/${hrefQLTK}`}><strong>Quản lý tài khoản</strong></Button>
                    <Button variant="warning" size="sm" className='header-button-register' onClick={() => setActorState('mainHome', '/trang-chu')}><strong>Đăng xuất</strong></Button>
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
                    <img src={logo} alt='Logo HustTeach' width="60px" onClick={() => setActorState('mainHome', '/trang-chu')} ></img>
                    <span className='header-span' style={{fontSize: "25px"}}>HustTeach</span>
                </div>
                {groupButtonHeader}
            </Container>
        </div>
    )
}

export default Header