//array for x-axis of map
let row = [];

//class for  people such as player and antagonist
function Person() {
    this.name,
    this.x,
    this.y,
    this.strength = 3,
    this.inventory = []
}

//class for items
function Item() {
    this.title,
    this.description
}

//class for each square in the map/grid
function Area() {
    this.y,
    this.description,
    this.item = []
}

//when document is loaded create player and antagonist and position them and give player a name
//then initiate functions initiateButtons, createMap, displayMap and introMessage
$(document).ready(function() {
    let player = new Person();
    let name = prompt("Vad vill du att din karaktär ska heta?");
    if (name) {
        player.name = name;
    }
    else {
        player.name = "Kurt";
    }
    player.x = 0;
    player.y = 0;

    let antagonist = new Person();
    antagonist.name = "Ragge Långdrägg";
    antagonist.x = 4;
    antagonist.y = 4;

    initiateButtons(player, antagonist);

    createMap();

    displayMap();

    introMessage(player);

})

//declare what buttons and keypresses will do and inititate functions moveCharacter and updateScroll
function initiateButtons(player, antagonist) {
    $("#movewest").click(function() {
        if (player.x > 0) {
            player.x -= 1;
            moveCharacter(player, antagonist, 1);
        }
        
        else {
            moveCharacter(player, antagonist, 5);
        }

        updateScroll();
    });

    $("#movenorth").click(function() {
        if (player.y <= 3) {
            player.y += 1;
            moveCharacter(player, antagonist, 2);
        }
                
        else {
            moveCharacter(player, antagonist, 5);
        }

        updateScroll();
    });

    $("#moveeast").click(function() {
        if (player.x <= 3) {
            player.x += 1;
            moveCharacter(player, antagonist, 3);
        }
                
        else {
            moveCharacter(player, antagonist , 5);
        }

        updateScroll();
    });

    $("#movesouth").click(function() {
        if (player.y > 0) {
            player.y -= 1;
            moveCharacter(player, antagonist, 4);
        }
                
        else {
            moveCharacter(player, antagonist, 5);
        }

        updateScroll();
    });

    $(document).keydown(function(event) {
        if (event.which == 37) {
            event.preventDefault();

            if (player.x > 0) {
                player.x -= 1;
                moveCharacter(player, antagonist, 1);
            }
            
            else {
                moveCharacter(player, antagonist, 5);
            }
    
            updateScroll();
        }
        if (event.which == 38) {
            event.preventDefault();

            if (player.y <= 3) {
                player.y += 1;
                moveCharacter(player, antagonist, 2);
            }
                    
            else {
                moveCharacter(player, antagonist, 5);
            }
    
            updateScroll();
        }
        if (event.which == 39) {
            event.preventDefault();

            if (player.x <= 3) {
                player.x += 1;
                moveCharacter(player, antagonist, 3);
            }
                    
            else {
                moveCharacter(player, antagonist, 5);
            }
    
            updateScroll();
        }
        if (event.which == 40) {
            event.preventDefault();

            if (player.y > 0) {
                player.y -= 1;
                moveCharacter(player, antagonist, 4);
            }
                    
            else {
                moveCharacter(player, antagonist, 5);
            }
    
            updateScroll();
        }
        
    });
}

//create items and randomize their location on the map
function createItems() {
    row[2][1].item.push("Blomma");

    row[4][3].item.push("Pickadoll");

}
//take x-axis array "row" and fill with y-axis array "column", then fill every column with an Area object, then run function randomizeArea
function createMap() {
    
    for (let i = 0; i < 5; i++) {
        let column = [];

        for (let y = 0; y < 5; y++) {
            let area = new Area();
            area.y = y;
            let description = randomizeArea();
            area.description = description;

            column.push(area);
        }
        row.push(column);
    } 

    row[0][0].description = "ett litet samhälle på landsbygden";

    createItems();

    console.log(row);

}

//randomize the environment of every Area on the map
function randomizeArea() {
    let rdm = Math.floor(Math.random() * 5);

    if (rdm <= 3) {
        return description = "en lugn och säker äng";
    } 

    else {
        return description = "en mörk och läskig skog";
    }

}

//display the map in HTML
function displayMap() {

    // for (let i = 0; i < row.length; i++) {
    //     for (let y = 0; y < row[i].length; y++) {
    //         $("#map").append($("<div>").addClass("border").html("O"));
    //     }
    // }
}

//introduction to the game
function introMessage(player) {
    $("#textarea").append($("<p>").html("Hej och välkommen till Textspelet&#169;"))
    .append($("<p>").html("I det här spelet använder du knapparna nedan för att styra din karaktär. Du kan även använda piltangenterna" +
    " för att styra din karaktär. Din karaktär heter " + player.name + "."))
    .append($("<p>").html(player.name + " ser " + row[player.x][player.y].description));
    
    if (player.name.endsWith("s")) {
        $("#textarea").append($("<p>").html(player.name + " position är just nu: " + player.x + ", " + player.y));
    }
    else {
        $("#textarea").append($("<p>").html(player.name + "s position är just nu: " + player.x + ", " + player.y));
    }
    
}

//take the direction the player chose and try to move the character in that direction, then check if player is in an item space
//lastly check if player is in same space as antagonist and if player has passed the requirements for ending the game
//initiate function moveAntagonist
function moveCharacter(player, antagonist, direction) {
    $("#textarea").append($("<p>").html(""));

    let message = $("<div>").addClass("border");

    if(direction == 1) {
        message.append($("<p>").html(player.name + " rör sig västerut"))
        .append($("<p>").html(player.name + " ser " + row[player.x][player.y].description));
    }

    if(direction == 2) {
        message.append($("<p>").html(player.name + " rör sig norrut"))
        .append($("<p>").html(player.name + " ser " + row[player.x][player.y].description));
    }

    if(direction == 3) {
        message.append($("<p>").html(player.name + " rör sig österut"))
        .append($("<p>").html(player.name + " ser " + row[player.x][player.y].description));
    }

    if(direction == 4) {
        message.append($("<p>").html(player.name + " rör sig söderut"))
        .append($("<p>").html(player.name + " ser " + row[player.x][player.y].description));
    }

    if(direction == 5) {
        message.append($("<p>").html(player.name + " kan inte röra sig längre åt den riktningen"))
        .append($("<p>").html(player.name + " ser fortfarande " + row[player.x][player.y].description));
    }

    if (player.name.endsWith("s")) {
        message.append($("<p>").html(player.name + " position är just nu: " + "<b>" + player.x + ", " + player.y + "</b>"));
    }
    else {
        message.append($("<p>").html(player.name + "s position är just nu: " + "<b>" + player.x + ", " + player.y + "</b>"));
    }

    if (row[player.x][player.y].item.length) {
        message.append($("<p>").html(player.name + " hittar: " + "<u><b>" + row[player.x][player.y].item + "</b></u>"));
    }

    $("#textarea").append(message);

    // if (row[player.x][player.y].item === undefined || row[player.x][player.y].item == 0) {
    //     console.log("HALLÅ");
    // }

    if(player.x == 4 && player.y == 3 && row[4][3].item[0]) {
        player.inventory.push(row[4][3].item[0]);
        $("#inventory").append($("<p>").html(row[4][3].item[0]));
        row[4][3].item.splice(0, 1);
        console.log(player.inventory);
    }

    if(player.x == 2 && player.y == 1 && row[2][1].item[0]) {
        player.inventory.push(row[2][1].item[0]);
        $("#inventory").append($("<p>").html(row[2][1].item[0]));
        row[2][1].item.splice(0, 1);
        console.log(player.inventory);
    }

    moveAntagonist(antagonist);

    if (player.x == antagonist.x && player.y == antagonist.y) {
        let antagonistWarning = $("<div>").addClass("bg-danger border").html("<b>Du träffar på en obehaglig person. Personen introducerar sig som " +
        antagonist.name + "</b>");
        $("#textarea").append(antagonistWarning);
    }

    if (player.x == antagonist.x && player.y == antagonist.y && player.inventory.includes("Pickadoll")) {
        let decision = confirm("Vill " + player.name + " skjuta " + antagonist.name + "?");
        if (decision == true) {
            if (antagonist.name.endsWith("s")) {
                alert(player.name + " avslutar " + antagonist.name + " liv.")
            window.location.href = "https://www.youtube.com/watch?v=qyTyd1XOydM";
            }

            else {
                alert(player.name + " avslutar " + antagonist.name + "s liv.")
                window.location.href = "https://www.youtube.com/watch?v=qyTyd1XOydM";
            }
        }

        else {
            alert(player.name + " väljer att låta " + antagonist.name + " leva, för den här gången.");
        }
    }

    // console.log(player.inventory);

}

//update textarea so latest message is showing
function updateScroll() {
    let element = document.getElementById("textarea");
    element.scrollTop = element.scrollHeight;
}

//randomize where antagonist will move
function moveAntagonist(antagonist) {
    let rdm = Math.floor(Math.random() * 5);

    if (rdm == 1) {
        if (antagonist.x > 0) {
            antagonist.x -= 1;
        }
    }

    if (rdm == 2) {
        if (antagonist.y < 4) {
            antagonist.y += 1;
        }
    }

    if (rdm == 3) {
        if (antagonist.x < 4) {
            antagonist.x += 1;
        }
    }

    if (rdm == 4) {
        if (antagonist.y > 0) {
            antagonist.y -= 1;
        }
    }

    $("#enemy").html(antagonist.x + ", " + antagonist.y);

}