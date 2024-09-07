import express from 'express';
import mongoose from 'mongoose';
import User from './user.js';  // Ensure you add the correct extension

const app = express();
const PORT = 8000;

app.use(express.json());

mongoose.connect("mongodb+srv://walidmoussa00:iOa416qkoPAUpCCE@cluster0.gaa1pcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to DB successfully");
    })
    .catch((error) => {
        console.log("Error with connecting to DB", error);
    });

const users = [
    { id: 1, username: "homos", password: "salsa" },
    { id: 2, username: "ibrahim", password: "pizza" }
];

let posts = [
    { id: 1, userID: 1, title: "My first express project", content: "Amazing project if you ask me ;)" },
    { id: 2, userID: 1, title: "My first express project", content: "Amazing project if you ask me ;)" },
    { id: 3, userID: 2, title: "for user 2", content: "testing" }
];

app.get('/', (req, res) => {
    res.send('HII, I MISSED YOU');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/register', async (req, res) => {
    const newUser = new User();
    const{username , password} = req.body;
    newUser.id = 4;
    newUser.username = username;
    newUser.password = password;
    await newUser.save();
    //const newUser = { id: users[users.length - 1].id + 1, ...req.body };
    res.status(200);
    res.json(newUser);
});

app.post('/login', async (req, res) => {
   const {username , password} = req.body;
   const findUser = await User.findOne({username : username , password : password});
    try{
        if (!findUser) {
            res.status(404).send("Invalid credentials, please try again!");
        } else {
            res.status(200).send(`Welcome back Mr/Miss ${username}!`);
        }
    }catch(error){
        res.status(500);
        res.send("An error occured when trying to login. Please try again later.")
    }
});

app.post('/publishPost', (req, res) => {
    const { userID, title, content } = req.body;
    const newPostID = posts.length === 0 ? 1 : posts[posts.length - 1].id + 1;
    
    const newPost = {
        id: newPostID,
        userID,
        title,
        content
    };
    
    posts.push(newPost);
    res.status(201).send(posts);
});

app.post('/viewPosts/:userID', (req, res) => {
    const requestedUserID = req.params.userID;
    const userPosts = posts.filter((temp) => requestedUserID == temp.userID);
    if (userPosts.length === 0) {
        res.status(404).send("No posts found for this user");
    } else {
        res.status(200).send(userPosts);
    }
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
