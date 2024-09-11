import { message } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Login from './Login';

function ViewPosts(){
    const{userID} = useParams();
    const[messages , setMessages] = useState("");
    const[posts , setPosts] = useState([]);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        navigate('/');
    }
    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                const response = await fetch(`http://localhost:8000/viewPosts/${userID}`);
                if(response.ok){
                    const postData = await response.json();
                    if(postData.message){
                        setMessages(postData.message);
                    }
                    else{
                        setPosts(postData);
                    }
                }
            }
            catch(error){
                console.log("error fetching posts: " , error);
            }
        }
        fetchPosts();
    } , [userID])


    return(
        <div className="Posts_Page">
            {messages ? <h1>{messages}</h1>
            : posts.map(posts =>(
                <div key={posts._id}>
                    <h2>{posts.title}</h2>
                    <p>{posts.content}</p>
                </div>
            ))}
        <Button type="primary" onClick={handleLogout}>Logout</Button>
        </div>
    )
}


export default ViewPosts;