//Login backend.
//When the button is pressed

//Fixed button and makes it actually click and log data
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("login").addEventListener("submit", async (e) => {

    console.log("Login button chicked");

    /*      For refrence
            var data = { //IMPORTANT for fetch problem
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        } */

    //Get the values user inputted, like with signup but we only care about two of them.
    //Implement fix used for signup, assign the inputs to vars then pack them into a box.

    const email = document.getElementById("email").value;
    const password = document.getElementById("password");

    const collectedData = {
        email: email,
        password: password
    }

    //Make sure data is there.
    if(!email || !password) {
    alert("Please fill in all fields before submiting");
    return;
} 

    //Sends the data to server.
    fetch("http://localhost:5001/login", {
        method: "POST", //Going with post because we still need to collect the user data, at least to compare it.
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(collectedData)
    })
    .then(response => {     //If it's not working explicitly then 
        return response.json();
    })
    .then(data => {
        console.log("Uploaded to server ", data);
        if (data.msg === "SUCCESS", data) {
            alert("Logged in successfully!");
            window.location.href = "/"; //Send data to main page, which will log them in.
        } else {
            alert("Not in system, try again or create an account.")
        }
    })
    .catch(error => {
        console.error("This is causing an error... " + error)
    })
});

});

/* Nice to have, will work on if time is available. .then(data => {     //Sends the user back to index.html logged in, but only if they answer correctly.
        if (data) {
            window.location.href = "index.html";
        } else {
            alert("Wrong email and password, try again or");
        }
    }) */