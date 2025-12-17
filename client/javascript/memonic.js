document.addEventListener("DOMContentLoaded", function () {

    console.log("memonic.js is working... at least at the start.");

    //Listen for the submit button, and if pressed, run the below code
    document.getElementById("memonicForm").addEventListener("submit", function(e) { 
    
    //Learn from last time and put preventDefault(); incase that error from before creeps up again.
    e.preventDefault();

    console.log("Form is being submitted");

    const collectedData = {
        player_id: localStorage.getItem("userID"),
        body_energy: document.getElementById("body_energy").value,
        mind_energy: document.getElementById("mind_energy").value,
        spirit_energy: document.getElementById("spirit_energy").value,
        soul_energy: document.getElementById("soul_energy").value,
       player_id: localStorage.getItem("userID")
    }

    console.log("Data collected");
    //Fetch to send the data.
    fetch("http://localhost:5001/memonic", {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(collectedData)
        })
    .then(response => response.json())  //Convert JSON to object
    .then(data => { //Validator
        if(data.msg === "SUCCESS") {
            alert("Character created successfully!");
        } else {
            alert("Error");
        }
    });

    });


});