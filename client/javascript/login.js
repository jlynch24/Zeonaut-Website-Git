//When the button is pressed
document.getElementById("login").addEventListener("submit", async (e) => {

    //Get the values user inputted.
    const collectedData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    //After log in, send the user to main page, hopefully now signed in.
    if(response.ok) {
        window.location.href = "client\genPages\index.html";
    }

});