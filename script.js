let key = "444949-SaiDamir-D59ZXB1T"
let sugName;
let sugArtist;
let sugDesc;

// function getFakeNameFromApi() {
//     event.preventDefault(); // This prevents the form from reloading the page!
//     var url = buildApiUrl(); // Call the buildApiUrl() function to get the URL.
//     // 1255d2-62821c-3af470-0927bc-108057
//   var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 && this.status == 200) {
//           var nameObject = JSON.parse(this.responseText);
//           console.log(nameObject);
//           displayFakeName(nameObject.name);
//       }
//   }
//     xhttp.open("GET", url, true);
//     xhttp.setRequestHeader("x-api-key","1255d2-62821c-3af470-0927bc-108057");
//     xhttp.send();

//     // @TODO: Fill in this function to do the following:

//     // 2. Make an AJAX call to the API and save the generated name in a variable.

//     // 3. Call the displayFakeName() function from within your onreadystatechange function, and pass in the generated name.

//     console.log("If you see this in the console, the getFakeNameFromApi() function was called.")
//   }

function addItem() {

    //add item to list of favorites
    //call buildSuggestions() function to regenerate the list of suggestions
    let list = document.getElementById("listOfLikes");
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = document.getElementById("newItemEnter").value;
    p.className = "likedArtistNames";
    document.getElementById("newItemEnter").value = "";
    li.appendChild(p);

    let removeB = document.createElement("INPUT");
    removeB.setAttribute("type", "button");
    removeB.className = "deleteButton";
    removeB.addEventListener("click", function (event) { deleteItem(event) })
    li.appendChild(removeB);
    li.appendChild(document.createElement("hr"));
    list.appendChild(li);
}

function deleteItem(event) {
    console.log(event);
    event.path[1].remove();
}

function buildURL() {
    //build q by iterating through list items
    //easy to build the url from there
    let favs = document.getElementsByClassName("likedArtistNames");
    let extraURL = "";
    for (let i = 0; i < favs.length; i++) {
        extraURL = extraURL + favs[i].innerHTML
        if (i < favs.length - 1) {
            extraURL = extraURL + "%2C"
        }
    }

    let baseURL = "https://tastedive.com/api/similar?limit=1&info=1&q=";



    let finishedURL = baseURL + extraURL + "&k=" + key;

    console.log(finishedURL)
    return finishedURL

}

function generateSuggestions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let sugArtist = JSON.parse(this.responseText);
            console.log(sugArtist);
             sugName = sugArtist.Similar.Results[0].Name;
             sugDesc = sugArtist.Similar.Results[0].wTeaser;
             youTube = sugArtist.Similar.Results[0].yUrl;
             console.log(sugName);
             document.getElementById("sugArtistName").innerHTML = sugName;
             document.getElementById("wikiName").innerHTML = sugName;
             document.getElementById("youtubeName").innerHTML = sugName;
             console.log(sugDesc)
             document.getElementById("desc").innerHTML = sugDesc;
             console.log(youTube)
             document.getElementById("video").src=youTube;

        }
    }
    xhttp.open("GET", "https://cors-anywhere.herokuapp.com/"+buildURL(), true);
    xhttp.setRequestHeader("x-api-key", key);
    xhttp.send();
    // let check = buildURL();
    // fetch(buildURL())
    // fetch(buildURL(), {
    //   credentials: 'include',
    //   method: 'GET'

    //   }).then(result => console.log('success====:', result))
    //     .catch(error => console.log('error============:', error));

    

}

function likeArtist() {
    //have event listeners for each of the suggested artists. If like button clicked run addItem() type function
    //after adding the new artist, rerun buildSuggestions()

    
    let list = document.getElementById("listOfLikes");
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = document.getElementById("sugArtistName").innerHTML;
    p.className = "likedArtistNames";
    document.getElementById("newItemEnter").value = "";
    li.appendChild(p);

    let removeB = document.createElement("INPUT");
    removeB.setAttribute("type", "button");
    removeB.className = "deleteButton";
    removeB.addEventListener("click", function (event) { deleteItem(event) })
    li.appendChild(removeB);
    li.appendChild(document.createElement("hr"));
    list.appendChild(li);
    generateSuggestions();

}

function enter(event) {
    console.log(event)
    if (event.key == "Enter") {
        addItem();
    }
}


let sugLove = document.getElementById("likeSugB")
sugLove.addEventListener("click", function (event) { likeArtist() });

let submitB = document.getElementById("submitNewItem")
submitB.addEventListener("click", function (event) { addItem() });
document.addEventListener("keypress", function (event) { enter(event) });
let generateB = document.getElementById("genSug")
generateB.addEventListener("click", function (event) { generateSuggestions() })