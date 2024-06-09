import React, { useContext } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import google from '../../assets/images/google.png'
import { ActorContext } from '../../contexts/actorContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterForm = () => {

    const {actorState, dispatch, registerTutor} = useContext(ActorContext)
    const navigate = useNavigate()

    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    let role = 'gia sư'
    let roleData = 'tutorLoginHome'
    if(currentRoleActor === 'parentsLoginHome') {
        role = 'phụ huynh'
        roleData = 'parentsLoginHome'
    }

    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }

    // Local state
	const [registerForm, setRegisterForm] = useState({
		name: '',
        email: '',
		password: ''
	})

	const { name, email, password } = registerForm

	const onChangeRegisterForm = event => {
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
    }

    const register = async event => {
		event.preventDefault()
        console.log(registerForm)
		try {
            if(currentRoleActor === 'tutorLoginHome') {
                const registerData = await registerTutor(registerForm)
                console.log(registerData)
                if(registerData.success) {
                    navigate('/dang-nhap')
                }
            } else {

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
                        <span style={{color: "#00b050", fontSize: "20px"}}><strong>{`Đăng ký tài khoản ${role}`} </strong></span>
                    </div>
                    <Button  className="w-80 button-css mt-20" style={{backgroundColor: "white", border: "1px solid #00b050"}} onClick={() => { /* Handle Google Sign Up */ }}>
                        <img src={google} alt="google icon" width="28px" height="28px" className='mr-20'></img>
                        <span style={{color: "#4E95D9", fontWeight: '700'}}>Đăng ký tài khoản với Google</span>
                    </Button>
                    <div className='mt-10'>
                        <span>
                            {`Bạn đã có tài khoản, `}
                            <strong style={{textDecoration: "underline", cursor: "pointer"}}
                                onClick={() => setActorState(roleData, '/dang-nhap')}
                            >
                                Đăng nhập
                            </strong>
                        </span>
                    </div>
                </Col>
                <Col md={6} style={{padding: '0 40px', textAlign: "center"}}>
                    <Form onSubmit={register}>
                        <FloatingLabel
                            controlId="formFullName"
                            label="Họ và tên"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập họ tên"
                                name="name"
                                value={registerForm.name}
                                onChange={onChangeRegisterForm}
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="formEmail"
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="email" 
                                placeholder="Nhập email"
                                name="email"
                                value={registerForm.email}
                                onChange={onChangeRegisterForm}
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
                                value={registerForm.password}
                                onChange={onChangeRegisterForm}
                                required
                            />
                        </FloatingLabel>

                        <Button className='button-css' type="submit">
                            <strong>Đăng ký ngay</strong>
                        </Button>

                    </Form>

                    <div className='mt-10'>
                        <span style={{fontSize: "14px"}}>Bằng cách tạo tài khoản, bạn đồng ý với <a href='/'>Điều khoản sử dụng</a></span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;