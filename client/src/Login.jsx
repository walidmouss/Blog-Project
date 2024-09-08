import { useState } from "react";

function Login(){

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const handleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const user = {
            username:username,
            password:password
        }

        const response = await fetch('http://localhost:8000/login' ,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        });
        if(response.ok){
            console.log("Logged in successfully")
        }
        else{
            console.log("login failed");
        }
    }

    return(
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your username:
                    <input
                        type="text"
                        value = {username}
                        onChange={handleUsernameChange}/>
                </label>
                <br/>
                <label>
                    Enter your password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}/>
                </label>
                <br/>
                <button type="submit">login</button>
            </form>
            <br/>
        </div>
    )
}

export default Login;