document.addEventListener("DOMContentLoaded", function () {

    console.log("memonic.js is working... at least at the start.");

    //Listen for the submit button, and if pressed, run the below code
    document.getElementById("mmemonicForm").addEventListener("submit", function(e) { 
    
    //Learn from last time and put preventDefault(); incase that error from before creeps up again.
    e.preventDefault();

    console.log("Form is being submitted");

    const collectedData = {
        character_name: document.getElementById("character_name").value,
        body_energy: document.getElementById("body_energy").value,
        mind_energy: document.getElementById("mind_energy").value,
        spirit_energy: document.getElementById("spirit_energy").value,
        soul_energy: document.getElementById("soul_energy").value,


    }
    
    });


})