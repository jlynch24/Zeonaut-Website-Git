//This page will log the information taken from signup.html into the database 
// (when I can connect the database)

console.log("file loaded");
//Add a listener so that when the user clicks the submit button it dose something.
//document.getElementById("signUpButton").addEventListener("click", function(e) {
function signup() { 
    console.log("button clicked");
    //Collected the data and prepare it to be shipped
    const playerData = {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

/* Convert to system
    if(!name || !author || !type || !level || !text) {
    alert("Please fill in all fields before submiting");
    return;
} */

    //Link servers! Link!
    // Send it to the server.
    fetch("http://localhost:5001/signup", { //Fetch the data from the page.
        //Make it post, link it to server, pack into a json object
        method: "POST", //Make this a POST fetch
        headers: { "Content-Type": "application/json"},    
        body: JSON.stringify(playerData),
    })
    .then(response => {
        console.log("Checking to see if the data is working.")
        if(!response.ok) { //If it isn't working, tell me!
            throw new Error("signup.js is not working!")
        }
            return response.json();
    })
    .then(data => { 
        if(data.msg === "SUCCESS") {
            alert("YAy");
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });

}