var express = require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
const req = require("express/lib/request");

const app = express();

app.use(bodyParser.json())
app.use(express.static('html'))
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=> console.log("connected to database"));

app.post("/login",(res,req)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;
    var password=req.body.password;

    var data = {
        "name": name,
        "email":email,
        "phone":phone,
        "password":password,
        "password":password
    }
    db.collection('users').insertMany(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("recorded data successfully");
    });
    return res.redirect('Register.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('Register.html');
}).listen(3000);

console.log("listening on PORT 3000");