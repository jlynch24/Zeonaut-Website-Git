//This page will log the information taken from signup.html into the database 
// (when I can connect the database)

//Add a listener so that when the user clicks the submit button it dose something.
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    
    //Collected the data and prepare it to be shipped
    const collectedData = {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    //Link servers! Link!
    // Send it to the server.
    fetch("http://localhost:5001/signup", { //Fetch the data from the page.
        //Make it post, link it to server, pack into a json object
        method: "POST", //Make this a POST fetch
        headers: "application/json",    
        body: JSON.stringify(collectedData),
    })
    .then(data => {
        if(!response.ok) {
            throw new Error("signup.js is not working!")
        }
            return response.json();
    })

    //After sign in, send the user to login.
    if(response.ok) {
        window.location.href = "client\genPages\signup.html";
    }
});