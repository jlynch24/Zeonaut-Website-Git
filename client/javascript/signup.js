//This page will log the information taken from signup.html into the database 
// (when I can connect the database)

console.log("file loaded");
//Add a listener so that when the user clicks the submit button it dose something.
//document.getElementById("signUpButton").addEventListener("click", function(e) {
//Facilitates the clicking better.
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signUpButton").addEventListener("click", function(e) {
    
    console.log("button clicked");

    //Collected the data and prepare it to be shipped
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //Another problem was that collected data above and below was in different arrays of the same name.
    const collectedData = {
        email: email,
        username: username,
        password: password
    };

    console.log("Objects packed");

    //Validation, no empty fields.
    if(!email || !username || !password) {
    alert("Please fill in all fields before submiting");
    return;
} 

    console.log("Validators running")

    //Link servers! Link!
    // Send it to the server.
    fetch("http://localhost:5001/signup", { //Fetch the data from the page.
        //Make it post, link it to server, pack into a json object
        method: "POST", //Make this a POST fetch
        headers: { "Content-Type": "application/json"},    
        body: JSON.stringify(collectedData),
        //THERE WAS NO PLAYER DATA, THERE WAS NEVER PLAYER DATA IT WAS COLLECTED DATA
    })
    .then(response => {
        console.log("Checking to see if the data is working.")
        // if(!response.ok) { //If it isn't working, tell me!
        //     throw new Error("signup.js is not working!")
        // }
            return response.json();
    })
    .then(data => { //Return Success if backend is working.
        if(data.msg === "SUCCESS") {
            alert("YAy");
        } else {
            alert("Error: " + data.msg); //Explains what is wrong with data.
        }
    })
    .catch(error => {
        alert("Error: " + error);
        console.error("Fetch error:", error);
    });
}); //It wasn't a signup issue mostly, it was a button issue.
});