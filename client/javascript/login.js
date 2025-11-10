//Login backend.
//When the button is pressed
document.getElementById("login").addEventListener("submit", async (e) => {

    //Get the values user inputted, like with signup but we only care about two of them.
    const collectedData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    //Sends the data to server.
    fetch("https://localhost:5001/login", {
        method: "POST", //Going with post because we still need to collect the user data, at least to compare it.
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(collectedData)
    })
    .then(response => {     //If it's not working explicitly then 
        if (!response.ok) {
            throw new Error("login.js is not working!")
        }
    })
    .then(data => {     //Sends the user back to index.html logged in, but only if they answer correctly.
        if (data) {
            window.location.href = "index.html";
        } else {
            alert("Wrong email and password, try again or");
        }
    })
});