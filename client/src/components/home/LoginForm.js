import React, { useContext } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import google from '../../assets/images/google.png'
import { ActorContext } from '../../contexts/actorContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {

    const {actorState, dispatch, loginTutor, loginParents} = useContext(ActorContext)
    const navigate = useNavigate()

    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    let role = 'gia sư'
    let roleData = 'tutorLoginHome'
    let loginSuccess = 'tutorMainHome'
    let loginSuccessHref = '/gia-su'

    if(currentRoleActor === 'parentsLoginHome') {
        role = 'phụ huynh'
        roleData = 'parentsLoginHome'
        loginSuccess = 'parentsMainHome'
        loginSuccessHref = '/phu-huynh'
    }

    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }

    // Local state
	const [loginForm, setLoginForm] = useState({
        email: '',
		password: ''
	})

	const { email, password } = loginForm

	const onChangeLoginForm = event => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const login = async event => {
		event.preventDefault()
        console.log(loginForm)
		try {
            if(currentRoleActor === 'tutorLoginHome') {
                const loginData = await loginTutor(loginForm)
                console.log(loginData)
                if(loginData.success) {
                    setActorState(loginSuccess, loginSuccessHref)
                    navigate('/gia-su')
                }
            } else {
                if(currentRoleActor === 'parentsLoginHome') {
                    const loginData = await loginParents(loginForm)
                    console.log(loginData)
                    if(loginData.success) {
                        setActorState(loginSuccess, loginSuccessHref)
                        navigate('/phu-huynh')
                    }
                }
            }
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <Container className='mb-30'>
            <Row className="mt-5">
                <Col md={6} className="mb-4" style={{textAlign: 'center', borderRight: '1px solid #00b050'}}>
                    <div>
                        <span style={{color: "#00b050", fontSize: "20px"}}><strong>{`Đăng nhập tài khoản ${role}`} </strong></span>
                    </div>
                    <Button  className="w-80 button-css mt-20" style={{backgroundColor: "white", border: "1px solid #00b050"}} onClick={() => { /* Handle Google Sign Up */ }}>
                        <img src={google} alt="google icon" width="28px" height="28px" className='mr-20'></img>
                        <span style={{color: "#4E95D9", fontWeight: '700'}}>Đăng nhập tài khoản với Google</span>
                    </Button>
                    <div className='mt-10'>
                        <span>
                            {`Bạn chưa có tài khoản, `}
                            <strong style={{textDecoration: "underline", cursor: "pointer"}}
                                onClick={() => setActorState(roleData, '/dang-ky')}
                            >
                                Đăng ký
                            </strong>
                        </span>
                    </div>
                </Col>
                <Col md={6} style={{padding: '0 40px', textAlign: "center"}}>
                    <Form onSubmit={login}>

                        <FloatingLabel
                            controlId="formEmail"
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="email" 
                                placeholder="Nhập email"
                                name="email"
                                value={loginForm.email}
                                onChange={onChangeLoginForm}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="formPassword"
                            label="Mật khẩu"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="password" 
                                placeholder="Nhập mật khẩu"
                                name="password"
                                value={loginForm.password}
                                onChange={onChangeLoginForm}
                                required
                            />
                        </FloatingLabel>

                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button className='button-css' type="submit"
                                // onClick={() => setActorState(loginSuccess, loginSuccessHref)}
                            >
                                <strong>Đăng nhập</strong>
                            </Button>
                            <div>
                                <span>Quên mật khẩu?</span>
                            </div>
                        </div>
                        

                    </Form>

                    {/* <div className='mt-10'>
                        <span style={{fontSize: "14px"}}>Bằng cách tạo tài khoản, bạn đồng ý với <a href='/'>Điều khoản sử dụng</a></span>
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
