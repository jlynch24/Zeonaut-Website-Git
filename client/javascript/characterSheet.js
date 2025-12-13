document.addEventListener("DOMContentLoaded", function () {

    //Check to see if the page is running
    console.log("characterSheet is loading")
    
    const playerID = localStorage.getItem("userID");

    if (!playerID) return; //If no user log in, display nothing

    //Now get the data from the server.
    fetch("http://localhost:5001/get-character?player_id=" + encodeURIComponent(playerID)) 
    .then(response => response.json()) //JSON to Object, essentially get the box from the storage that is the server
    .then(data => {
        //Another check to see if we are actually getting the character
        console.log("Character sheet is being accessed.");
        //If we got a connection
        if(data.msg === "SUCCESS" && data.character) {
            const char = data.character;

            document.getElementById("character_name").textContent = char.character_name || "Unarmed";
            document.getElementById("body_energy").textContent = char.body_energy ?? 0;
            document.getElementById("mind_energy").textContent = char.mind_energy ?? 0;
            document.getElementById("spirit_energy").textContent = char.spirit_energy ?? 0;
            document.getElementById("soul_energy").textContent = char.soul_energy ?? 0;
        }
    })
    .catch(err => console.error("Fetch failed, this is why ", err));
})