import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import signupImage from './../assets/signupImage.svg';
import './Signup.css';
import Title from 'antd/es/typography/Title';

function Signup() {

    const onFinish = async (values) => {
        const user = {
            username: values.username,
            password: values.password
        };
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log("registered user successfull.");
        } else {
            console.log("register unsuccessfull");
        }

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='signup_page'>
            <div className='signupFormBox'>
                <div className="registerForm">
                    <h1 className="signup_title">
                        Create an account
                    </h1>
                    <Form
                        name="Signup_Form"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Signup
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='signup_image'>
                    <img src={signupImage} />
                </div>
            </div>
        </div>
    );
}

export default Signup;
