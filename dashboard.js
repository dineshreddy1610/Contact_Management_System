// Get logged user id
let userId = localStorage.getItem("userId");
let username = localStorage.getItem("username");

// If user not logged in redirect to login
if (!userId) {
    window.location.href = "login.html";
}

// Show welcome username
document.getElementById("welcomeUser").innerText = "Welcome " + username;



/* ------------------ LOAD CONTACTS ------------------ */

function loadContacts(){

fetch("http://localhost:3000/contacts/" + userId)

.then(res => res.json())

.then(data => {

if(!Array.isArray(data)){
console.log("Invalid data:", data);
return;
}

let table = "";

data.forEach(contact => {

let avatar = contact.gender === "male"
? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png";

table += `
<tr>

<td><img src="${avatar}" class="contact-photo"></td>

<td>${contact.name}</td>
<td>${contact.email}</td>
<td>${contact.phone}</td>

<td>
<button class="delete-btn" onclick="deleteContact(${contact.id})">Delete</button>
</td>

</tr>
`;

});

document.getElementById("contactList").innerHTML = table;

/* UPDATE CONTACT COUNT */
document.getElementById("contactCount").innerText = data.length;

});

}

// Load contacts when page opens
loadContacts();



/* ------------------ ADD CONTACT ------------------ */

document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("contactName").value;
let email = document.getElementById("contactEmail").value;
let phone = document.getElementById("contactPhone").value;
let gender = document.getElementById("contactGender").value;

fetch("http://localhost:3000/addContact", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
user_id: userId,
name: name,
email: email,
phone: phone,
gender: gender
})

})

.then(res => res.json())

.then(data => {

loadContacts();   // refresh table
document.getElementById("contactForm").reset();

});

});



/* ------------------ DELETE CONTACT ------------------ */

function deleteContact(id){

fetch("http://localhost:3000/deleteContact/" + id, {

method: "DELETE"

})

.then(res => res.json())

.then(data => {

loadContacts();

});

}



/* ------------------ DARK MODE ------------------ */

document.getElementById("darkModeBtn").addEventListener("click", function(){

document.body.classList.toggle("dark-mode");

});



/* ------------------ LOGOUT ------------------ */

function logout(){

localStorage.removeItem("userId");
localStorage.removeItem("username");

window.location.href = "login.html";

}

document.getElementById("searchInput").addEventListener("keyup", function() {

let search = this.value.toLowerCase();

let rows = document.querySelectorAll("#contactList tr");

rows.forEach(row => {

let name = row.children[1].innerText.toLowerCase();
let email = row.children[2].innerText.toLowerCase();

if(name.includes(search) || email.includes(search)){
row.style.display = "";
}else{
row.style.display = "none";
}

});

});