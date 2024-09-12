import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './user.js';  // user scheema
import Post from './post.js';   // post scheema
import { message } from 'antd';

const app = express();
const PORT = 8000;


app.use(cors({
    origin: 'http://localhost:5173', // Replace with your client URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

mongoose.connect("mongodb+srv://walidmoussa00:iOa416qkoPAUpCCE@cluster0.gaa1pcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to DB successfully");
    })
    .catch((error) => {
        console.log("Error with connecting to DB", error);
    });

app.get('/', (req, res) => {
    res.send('HII, I MISSED YOU');
});

app.get('/users', async  (req, res) => {
    try {
        const allUsers =  await User.find(); // Fetch all users from MongoDB
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

app.post('/register', async (req, res) => {
    const newUser = new User();
    const{username , password} = req.body;
    newUser.username = username;
    newUser.password = password;
    //const newUser = { id: users[users.length - 1].id + 1, ...req.body };
    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).send("Error registering new user. Please try again later.");
    }
});

app.post('/login', async (req, res) => {
   const {username , password} = req.body;
   const findUser = await User.findOne({username : username , password : password});
    try{
        if (!findUser) {
            res.status(404).send("Invalid credentials, please try again!");
        } else {
            res.status(200).json(findUser);
        }
    }catch(error){
        res.status(500);
        res.send("An error occured when trying to login. Please try again later.")
    }
});

app.post('/publishPost', async (req, res) => {
    const { userID, title, content } = req.body;
    
    const newPost = new Post({ userID, title, content });
    
    try {
        await newPost.save();
        res.status(201).json(newPost); // 201 status for resource creation
    } catch (error) {
        res.status(500).send("Error publishing post, try again later.");
    }
});


app.get('/viewPosts/:userID', async (req, res) => {
    const requestedUserID = req.params.userID;
    
    try{
        const userPosts = await Post.find({userID : requestedUserID});
        if (userPosts.length === 0) {
            res.status(200).json({message:"No posts found for this user =("});
        } else {
            res.status(200).json(userPosts);
        }
    }catch(error){
        res.status(500).send("Error fetching posts");
    }

    
});
app.get('/deletePost' , async(req,res) =>{

})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
