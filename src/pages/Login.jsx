import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import LoginImage from './../assets/LoginImage.svg';
import Title from 'antd/es/typography/Title';
import './Login.css';
import Signup from './Signup';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();

    const onFinish = async(values) =>{
        const user = {
            username:values.username,
            password:values.password
        }

        const response = await fetch('http://localhost:8000/login' ,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        });
        if(response.ok){
            const data = await response.json();
            navigate(`/ViewPosts/${data._id}`);
            message.success("logged in successfully");
        }
        else{
            message.error("login failed. Check you credentials");
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login_page'>
            <div className='loginFormBox'>
                <div className="loginForm">
                    <h1 className="login_title">
                        Welcome Back!
                    </h1>
                    <Form
                    name="login"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                        Log in
                        </Button>
                    </Form.Item>
                    <div className="signup-link">
                        <span>or</span> <Link to="/Signup">Create a new account</Link>
                    </div>
                    </Form>
                </div>
                <div className='login_image'>
                    <img src={LoginImage} />
                </div>
            </div>
        </div>
    );
}

export default Login;
