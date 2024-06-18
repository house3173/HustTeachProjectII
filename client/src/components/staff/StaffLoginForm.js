import React, { useContext } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { ActorContext } from '../../contexts/actorContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';

const StaffLoginForm = () => {

    const {actorState, dispatch, loginStaff} = useContext(ActorContext)
    const navigate = useNavigate()

    const currentRoleActor = JSON.parse(localStorage.getItem('actorState'));

    const setActorState = (roleData, navi) => {
        dispatch({type: "RESET_ACTOR", payload : roleData})
        navigate(navi)
    }

	const [loginForm, setLoginForm] = useState({
        staffId: '',
		staffPassword: ''
	})


	const onChangeLoginForm = event => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const login = async event => {
		event.preventDefault()
        console.log(loginForm)
		try {
            const loginData = await loginStaff(loginForm)
            console.log(loginData)
                if(loginData.success) {
                    setActorState('staffMainHome', '/staff31072003/trang-chu')
                    navigate('/staff31072003/trang-chu')
                }
		} catch (error) {
			console.log(error)
		}
	}

    return (
        <Container className='mb-30'>
            <Row className="mt-5">

                <Col style={{padding: '0 40px', textAlign: "center"}}>
                    <div className='mb-20'>
                        <span style={{color: "#00b050", fontSize: "26px"}}><strong>{`Đăng nhập tài khoản nhân viên`} </strong></span>
                    </div>

                    <div style={{padding: '0 200px'}}>

                    <Form onSubmit={login}>

                        <FloatingLabel
                            controlId="formEmail"
                            label="Mã nhân viên"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập mã nhân viên"
                                name="staffId"
                                value={loginForm.staffId}
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
                                placeholder="Nhập mật khẩu nhân viên"
                                name="staffPassword"
                                value={loginForm.staffPassword}
                                onChange={onChangeLoginForm}
                                required
                            />
                        </FloatingLabel>

                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button className='button-css' type="submit" style={{width: "50%"}}
                                // onClick={() => setActorState(loginSuccess, loginSuccessHref)}
                            >
                                <strong>Đăng nhập</strong>
                            </Button>
                        </div>
                        

                    </Form>
                    </div>

                    {/* <div className='mt-10'>
                        <span style={{fontSize: "14px"}}>Bằng cách tạo tài khoản, bạn đồng ý với <a href='/'>Điều khoản sử dụng</a></span>
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
};

export default StaffLoginForm;
