"use strict";

//This function calls all other "main" functions to create the page
window.addEventListener('load', (event) => {

    //This section gets all the templates on the HTML file
    let Template = document.getElementById("home");
    let displayTemplate = document.getElementById("display");
    let searchTemplate = document.getElementById("search");
    let addTemplate = document.getElementById("add");
    let removeTemplate = document.getElementById("del");

    //This opens tha page to a home page seperate from all the buttons
    root.appendChild(Template.content.cloneNode(true));

    //Gets all the <button> from the HTML file
    let displayButton = document.getElementById("displayButton");
    let searchButton = document.getElementById("searchButton");
    let addButton = document.getElementById("addButton");
    let deleteButton = document.getElementById("deleteButton");

    //This sections adds the functions below to the buttons in order to display a "page" when the buttons are clicked

    //Shows the display page when the display button is clicked
    function displayListener() {
        root.querySelectorAll("*").forEach(n => n.remove());
        root.appendChild(displayTemplate.content.cloneNode(true));
        buildInitialTable({once:true});
    }

    //Shows the search page
    function searchListenerFunction() {
        root.querySelectorAll("*").forEach(n => n.remove());
        root.appendChild(searchTemplate.content.cloneNode(true));
        addEventListener("submit", searchListener, {once:true});
    }

    //Shows the Add anime page
    function addListenerFunction() {
        root.querySelectorAll("*").forEach(n => n.remove());
        root.appendChild(addTemplate.content.cloneNode(true));
        addEventListener("submit", addListener, {once:true});
    }

    //Shows the delete anime page
    function deleteListenerFunction() {
        root.querySelectorAll("*").forEach(n => n.remove());
        root.appendChild(removeTemplate.content.cloneNode(true));
        addEventListener("submit", removeListener, {once:true});
    }

    //This section adds an event listener to each button so that it may run as told in the commet up top
    displayButton.addEventListener("click", displayListener);
    searchButton.addEventListener("click", searchListenerFunction);
    addButton.addEventListener("click", addListenerFunction);
    deleteButton.addEventListener("click", deleteListenerFunction);

})

function searchListener(e) {
    // Call the "GET /api/Anime/:field/:value" API endpoint and rebuilds the table 
    // after to display the information requested

    e.preventDefault();

    let inp = document.getElementsByTagName("input");
    let value = inp[0].value;
    let field = document.getElementById("drop").value;

    let url = `/api/Anime/${field}/${value}`;
    let req = new XMLHttpRequest();

    req.addEventListener("load", e => {
        if (req.status === 200) {
            buildTable(JSON.parse(req.responseText));
        } else {
            console.log(req.responseText)
        }
    });

    req.open("GET", url);
    req.setRequestHeader("Content-type", "application/json");
    req.send();
}


function addListener(e) {
    // Call the "POST /api/Anime" API endpoint to add new anime to the databse
    e.preventDefault();

    let url = "/api/Anime";
    let req = new XMLHttpRequest();

    let n = document.getElementById("add_anime").AnimeName.value;
    let a = document.getElementById("add_anime").Author.value;
    let y = document.getElementById("add_anime").Year.value;
    let s = document.getElementById("add_anime").Seasons.value;

    req.addEventListener("load", e => {
        if (req.status === 201) {
            buildInitialTable();
        } else {
            console.log(req.responseText)
        }
    });

    req.open("POST", url);
    req.setRequestHeader("Content-type", "application/json");
    let result = {"AnimeName": n, "Author": a, "Year": y, "Seasons": s};
    req.send(JSON.stringify(result));
}


function removeListener(e) {
    // Call the "DELETE /api/Anime/:id" API endpoint to delete an anime by AnimeID

    e.preventDefault();

    let id = document.getElementById("remove_anime").AnimeID.value;
    console.log(id)
    let url = `/api/Anime/${id}`;
    let req = new XMLHttpRequest();

    req.addEventListener("load", e => {
        if (req.status === 200) {
            buildInitialTable();
        } else {
            console.log(req.responseText)
        }
    });
    req.open("DELETE", url);
    req.send();
}

// Rebuilds the table to display the information requested
function buildInitialTable() {
    let req = new XMLHttpRequest();

    req.open('GET', '/api/Anime');

    req.addEventListener("load", function () {
        if (req.status === 200) {
            buildTable(JSON.parse(req.responseText));
        }
    });
    req.send();
}

//Build the table that will display on the page and adds the information required
function buildTable(data) {
    let div = document.getElementById("root");
    console.log(data);

    let table = document.createElement("table");
    let headingRow = document.createElement("tr");

    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("AnimeID"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("AnimeName"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Author"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Year"));
    headingRow.appendChild(document.createElement("th")).appendChild(document.createTextNode("Seasons"));

    table.appendChild(headingRow);

    for (let d of data) {
        let row = document.createElement("tr");

        let id = document.createElement("td");
        id.appendChild(document.createTextNode(d.AnimeID));
        row.appendChild(id);

        let name = document.createElement("td");
        name.appendChild(document.createTextNode(d.AnimeName));
        row.appendChild(name);

        let author = document.createElement("td");
        author.appendChild(document.createTextNode(d.Author));
        row.appendChild(author);

        let year = document.createElement("td");
        year.appendChild(document.createTextNode(d.Year));
        row.appendChild(year);

        let seasons = document.createElement("td");
        seasons.appendChild(document.createTextNode(d.Seasons));
        row.appendChild(seasons);

        table.appendChild(row);
    }
    div.appendChild(table);
}