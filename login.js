document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault();

const username=document.getElementById("loginUsername").value;
const password=document.getElementById("loginPassword").value;

fetch("http://localhost:3000/login",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username:username,
password:password
})

})

.then(res=>res.json())

.then(data=>{

if(data.message){

alert(data.message);

}else{

localStorage.setItem("userId",data.id);
localStorage.setItem("username",data.username);

window.location.href="dashboard.html";

}

});

});