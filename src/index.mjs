import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json());

const users = [
    {id:1 , username: "homos" , password: "salsa"},
    {id:2 , username: "ibrahim" , password: "pizza"}
];
let posts  = [
    {id:1 , userID:1 , title:"My first express project" , content:"Amazing project if you ask me ;)"},
    {id:2 , userID:1 , title:"My first express project" , content:"Amazing project if you ask me ;)"},
    {id:3 , userID:2 , title:"for user 2" , content:"testing"}
]

app.get('/', (req, res) => {
    res.send('HII, I MISSED YOU');
});

app.get('/users' , (req,res) =>{
    res.send(users);
});

app.post('/register' , (req,res) => {
    const newUser = {id:users[users.length-1].id+1 , ... req.body}
    return res.sendStatus(200);
    users.push(newUser);
    
})

app.post('/login' , (req,res) => {
    const {username , password} = req.body;
    const user = users.find((test) => test.username === username && test.password === password); 
    if(!user){
        res.status(404);
        res.send("Invalid credentials, please try again!");
    }
        res.sendStatus(200);
        res.send(`Welcome back Mr/Miss ${user.username}!`);

})

app.post('/publishPost', (req, res) => {
    const { userID, title, content } = req.body;
    let newPostID;
    if (posts.length === 0) newPostID = 1;
    else newPostID = posts[posts.length - 1].id + 1;
    
    const newPost = {
        id: newPostID,
        userID,
        title,
        content
    };
    
    posts.push(newPost);
    res.status(201).send(newPost);
});


app.post('/viewPosts/:userID' , (req , res) =>{
    const requestedUserID = req.params.userID;
    const userPosts = posts.filter((temp) => requestedUserID == temp.userID);
    if(userPosts.length==0){
        res.send("No posts found for this user");
        res.status(404);
    }
    res.status(200);
    res.send(userPosts);
})

app.listen(PORT , () => {
    console.log(`Running on Port ${PORT}`);
});