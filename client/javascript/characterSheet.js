document.addEventListener("DOMContentLoaded", function () {

    //Check to see if the page is running
    console.log("characterSheet is loading")
    
    const playerID = localStorage.getItem("userID");
    let characterID = localStorage.getItem("characterID");

    if (!playerID) return; //If no user log in, display nothing

    const characterSelect = document.getElementById("characterSelect"); //Dropdown for switching character

    //Now get the data from the server.
    fetch("http://localhost:5001/get-characters?player_id=" + encodeURIComponent(playerID))
    .then(response => response.json()) //JSON to Object, essentially get the box from the storage that is the server
    .then(data => {

        if (data.msg !== "SUCCESS") return;//Make sure it's working at this point.
        //Loop the array
        if (!Array.isArray(data.characters)) return;
        //Clear before filling
        characterSelect.innerHTML = "";

        //Pull up the characters with a for each, in the character table.
        data.characters.forEach(char => {
            const option = document.createElement("option");
            option.value = char.character_id;
            option.textContent = char.character_name;

            if (String(char.character_id) === characterID) {
                    option.selected = true;
            }

            characterSelect.appendChild(option);
        });

        //The character that is selected by default is the created first.
        if (!characterID || !data.characters.some(c => String(c.character_id) === characterID)) {
                characterID = data.characters[0]?.character_id || null;
                localStorage.setItem("characterID", characterID);
        }

        //Load selected character
        if (characterID) {
            loadCharacter(characterID);
        }
    });

    //Now get the character onto the page.
    function loadCharacter(id) {

        if (!id) return; //Prevent bad fetch

        fetch("http://localhost:5001/get-character?character_id=" + encodeURIComponent(id))
        .then(response => response.json())
        .then(data => {
            if (data.msg !== "SUCCESS" || !data.character) return;  //Check
            
            const char = data.character;

            console.log("Loaded character:", char); //Make sure it's changing
            
            document.getElementById("character_name").textContent = char.character_name + " (ID " + char.character_id + ")";
            document.getElementById("body_energy").textContent = char.body_energy ?? 0;
            document.getElementById("mind_energy").textContent = char.mind_energy ?? 0;
            document.getElementById("spirit_energy").textContent = char.spirit_energy ?? 0;
            document.getElementById("soul_energy").textContent = char.soul_energy ?? 0;
        });
    }

characterSelect.addEventListener("change", function () {
        characterID = this.value;
        localStorage.setItem("characterID", characterID);
        loadCharacter(characterID);
    });
});