const express = require('express'); //This line contains express module
const app = express(); //assigning express function to app variable
const database = require('mysql'); //This line contains mysql module
const ejs = require('ejs'); //This line contains ejs module
const bodyParser = require('body-parser'); //This line contains body-parser module
const path = require('path');
const http = require('http');
const  socketio = require('socket.io');
const port = process.env.PORT || 5056 ;
// const res = require('express/lib/response');
//HTTP Server
const server = http.createServer(app);

//Create and connect socket.io server
const io = socketio(server);


let sqlResponse ;



const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
//This line give access to ejs files
app.set("view engine","ejs");
app.set("views",path.join(__dirname,'./views'));


io.on('connection' , () => {console.log("New WebSocket Connection");})

//Connetting with database
let connection = database.createConnection({
    host : 'localhost',
    user : 'root',
    password : "",
    database : 'dummyDB',
})


//This line give access to ejs files
app.set("view engine","ejs")
  

connection.connect((error) => {
    if(error){
    console.log(error);
    }
    else{
        let sql = 'SELECT * FROM `Invoice_App` WHERE 1';
        connection.query(sql,(error, result) => {   
        sqlResponse = (result[0]);
        sqlResponse = (JSON.parse(sqlResponse.JsonData));
        // response.json(result);
        })
    }
})

var urlencodedParser = bodyParser.urlencoded({extended : false});
app.use(bodyParser.json());
app.post('/index',urlencodedParser,(req,res) => {
    sqlResponse.push(req.body.newInvoice);
    console.log(sqlResponse);
    let sql = `UPDATE Invoice_App  SET JsonData = '${JSON.stringify(sqlResponse)}' WHERE 1`;
        connection.query(sql,(error, result) => {   
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
            }
        })
})

app.post("/details",urlencodedParser,(req,res) => {
    sqlResponse.forEach((ele,index) => {
        if(ele.id == req.body.changeId){
            sqlResponse[index] = req.body.newInvoice;
            console.log(sqlResponse[0]);
        }
    })
    sqlResponse.forEach( (element,index) => {
        if(element.id == req.body.RemoveId){
            sqlResponse.splice(index,1)
        }
    } )
    console.log(sqlResponse);
    sqlResponse.map((ele) => { if(ele.id==req.body.id)ele.status="paid"});
    let sql = `UPDATE Invoice_App  SET JsonData = '${JSON.stringify(sqlResponse)}' WHERE 1`;
        connection.query(sql,(error, result) => {   
            if(error){
                console.log(error);
            }
            else{
                console.log(result);
            }
        })
})


app.get("/index",(request,response) =>{
    let Img = {
        jsScript : "js/home.js",
        cssSheet : 'css/home.css',
        JsonData : sqlResponse,
        logoImg : 'images/logo.png',
        sunImg : 'images/sun.png',
        moonImg : 'images/moon.png',
        avatarImg : 'images/image-avatar.jpg',
        rightArrowImg : 'images/icon-arrow-right.svg',
        bgImgLight : 'images/bgImgLight.png',
        bgImgDark : 'images/bgImgDark.png',
    }
    response.render("home",{Img});
    // response.send("Database Connected");
})

app.get("/details",(request,response) =>{
    let obj = {
        JsonData : sqlResponse,
        res : request,
        js : "js/details.js",
        css : 'css/details.css',
        logoImg : 'images/logo.png',
        sunImg : 'images/sun.png',
        moonImg : 'images/moon.png',
        avatarImg : 'images/image-avatar.jpg',
        leftArrowImg : 'images/icon-arrow-left.svg',
        bgImgLight : 'images/bgImgLight.png',
        bgImgDark : 'images/bgImgDark.png', 
    }
    response.render("details",{obj})
});





// this line should be always at the bottom of the scrpit


server.listen(port,'172.17.55.102',() => {
    console.log(`server is up on port ${port}`)
})

// app.listen(port, () => console.log("Listening..." , port));