import { useState } from "react";

function Signup(){

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const handleUsername = (e) =>{
        setUsername(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const user = {
            password: password,
            username: username
        }
        const response = await fetch('http://localhost:8000/register',{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        });

        if(response.ok){
            console.log("registered user successfull.");
        }
        else{
            console.log("register unsuccessfull");
        }

    }

    return(
       <div className="registerForm">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="String"
                        value={username}
                        onChange={handleUsername}/>
                </label>
                <br/>
                <label>
                    Password: 
                    <input
                        type="String"
                        value={password}
                        onChange={handlePassword}/>
                </label>
                <br/>
                <button type="submit">register</button>
            </form>
        </div>
    )
}

export default Signup;