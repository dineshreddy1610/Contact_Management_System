const express=require("express");
const router=express.Router();
const db=require("./db");

/* REGISTER */

router.post("/register",(req,res)=>{

const {username,password,name,email}=req.body;

const sql="INSERT INTO users(username,password,name,email) VALUES(?,?,?,?)";

db.query(sql,[username,password,name,email],(err,result)=>{

if(err){
console.log(err);
return res.json({message:"Registration failed"});
}

res.json({message:"User registered successfully"});

});

});

/* LOGIN */

router.post("/login",(req,res)=>{

const {username,password}=req.body;

const sql="SELECT * FROM users WHERE username=? AND password=?";

db.query(sql,[username,password],(err,result)=>{

if(err){
console.log(err);
return res.json({message:"Server error"});
}

if(result.length>0){

res.json({
id:result[0].id,
username:result[0].username
});

}else{

res.json({message:"Invalid username or password"});

}

});

});

/* ADD CONTACT */

router.post("/addContact",(req,res)=>{

const {user_id,name,email,phone,gender}=req.body;

const sql="INSERT INTO contacts(user_id,name,email,phone,gender) VALUES(?,?,?,?,?)";

db.query(sql,[user_id,name,email,phone,gender],(err,result)=>{

if(err){
console.log(err);
return res.json({message:"Contact not added"});
}

res.json({message:"Contact added successfully"});

});

});

/* GET CONTACTS */

router.get("/contacts/:user_id",(req,res)=>{

const user_id = req.params.user_id;

const sql = "SELECT * FROM contacts WHERE user_id=?";

db.query(sql,[user_id],(err,result)=>{

if(err){
console.log(err);
return res.json([]);
}

res.json(result);   // MUST return array

});

});

/* DELETE CONTACT */

router.delete("/deleteContact/:id",(req,res)=>{

const id=req.params.id;

const sql="DELETE FROM contacts WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err){
console.log(err);
return res.json({message:"Delete failed"});
}

res.json({message:"Contact deleted"});

});

});

module.exports=router;