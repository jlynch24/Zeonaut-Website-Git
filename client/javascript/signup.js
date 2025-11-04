//This page will log the information taken from signup.html into the database 
// (when I can connect the database)

//Add a listener so that when the user clicks the submit button it dose something.
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    
    const collectedData = {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    // Send it to the server.

    //After sign in, send the user to login.
    if(response.ok) {
        window.location.href = "client\genPages\signup.html";
    }
});