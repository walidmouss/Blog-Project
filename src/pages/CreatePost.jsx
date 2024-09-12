import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function CreatePost(){
    const navigate = useNavigate();
    const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    };

    const{userID} = useParams();
    const handleBack =() => {
        navigate(`/ViewPosts/${userID}`);
    }
    const onFinish = async(values) => {
    const post = {
        userID: userID,
        title:values.title,
        content:values.content
    }

    const response = await fetch('http://localhost:8000/publishPost' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    /*if (response.ok) {
        console.log(" publishing post successfull.");
    } else{
        console.log("publish unsuccessfull" );
    }*/
    console.log(post);
    navigate(`/ViewPosts/${userID}`);
    };

    
    return(
        <div>
            <Form
            {...layout}
            name="newPost"
            onFinish={onFinish}
            style={{
            maxWidth: 600,
            }}
        >
            <Form.Item
            name={'title'}
            label="Title"
            rules={[
                {
                required: true,
                message: 'Please enter a title',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            name={'content'}
            label="Content"
            rules={[
                {
                required: true,
                message: 'Please enter content',
                },
            ]}
            >
            <Input.TextArea />
            </Form.Item>

            <Form.Item
            wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            </Form>
            <Button type="primary" onClick={handleBack}>
                Back
            </Button>
        </div>
    )
};
export default CreatePost;