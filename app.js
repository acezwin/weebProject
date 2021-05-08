const api = "https://api.jikan.moe/v3";


//take userinput and uses api to retrieve the anime list (unsorted)
function searchAnime(){
    //user input selected
    var input = $("#animeID").val();
    //buttonevent
    var button = document.getElementById("searchButton");
    //api
    const settings = {
        "async": true,
        "crossDomain": true,
        //syntax works
        "url": `${api}/search/anime?q=${input}&page=1`,
        "method": "GET",
        "type": "anime",
    };
    //logging to see progress
    console.log(input);

    //progress + display result function called
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateDom(response);
        console.log("logged");
        });
}

//same as searchAnime(), type = mange
function searchManga(){

    //TODO: needs a reference <> after html #input for manga 
    var input = $("#animeID").val();
    
    var button = document.getElementById("searchButton");

    const settings = {
        "async": true,
        "crossDomain": true,
        //syntax works
        "url": `${api}/search/manga?q=${input}&page=1`,
        "method": "GET",
        "type": "manga",
    };
    console.log(input);

    
    $.ajax(settings).done(function (response) {
        console.log(response);
        updateDom(response);
        console.log("logged");
        });
}

//displaying result 
function updateDom(data){

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results
        .map(anime=>{
            return `
            </div>
                <div class="card">
                    <div class="card-body">
                        <img src="${anime.image_url}" width ="300" height="400">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${anime.title}</span>
                        <p>${anime.synopsis}</p>
                    </div>
                    <div class="card-action">
                        <a href="${anime.url}">Find out more</a>
                    </div>
                </div>
            `
        }).join("");
    }

    //pulling top anime sorted by ranked 1-x
    function topAnime(){
        var settings = {
            "url": "https://api.jikan.moe/v3/top/anime/1/upcoming",
            "method": "GET",
            "timeout": 0,
              "type": "anime",
              "page":1,
              "subtype": "upcoming",
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            showTopAnime(response);
          });
    }

    //display as previous functions
    function showTopAnime(data){
        const searchResults = document.getElementById('top-results');

        //card layouts from https://materializecss.com/cards.html         
        searchResults.innerHTML = data.top
            .map(anime=>{
                return `
                </div>
                    <div class="card">
                        <div class="card-body">
                            <img src="${anime.image_url}" width ="300" height="400">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${anime.title}</span>
                            <p>${anime.synopsis}</p>
                        </div>
                        <div class="card-action">
                            <a href="${anime.url}">Find out more</a>
                        </div>
                    </div>
                `
            }).join("");
        }
    
    

// function updateDom(data){
//     const searchResults = document.getElementById('search-results');
//     console.log(response);

//     searchResults.innerHTML = data.results
//        // .sort((a,b)=>a.episodes-b.episodes)            
//         .map(anime=>{
//             return `
//             </div>
//                 <div class="card">
//                     <div class="card-body">
//                         <img src="${anime.image_url}" width ="300" height="400">
//                     </div>
//                     <div class="card-content">
//                         <span class="card-title">${anime.title}</span>
//                         <p>${anime.synopsis}</p>
//                     </div>
//                     <div class="card-action">
//                         <a href="${anime.url}">Find out more</a>
//                     </div>
//                 </div>
//             `
//         }).join("");
//     }   

//     // //card layouts from https://materializecss.com/cards.html         
//     // data.map(function(anime) {
//     //     return `
//     //         </div>
//     //             <div class="card">
//     //                 <div class="card-body">
//     //                     <img src="${anime.image_url}" width ="300" height="400">
//     //                 </div>
//     //                 <div class="card-content">
//     //                     <span class="card-title">${anime.title}</span>
//     //                     <p>${anime.synopsis}</p>
//     //                 </div>
//     //                 <div class="card-action">
//     //                     <a href="${anime.url}">Find out more</a>
//     //                 </div>
//     //             </div>`
//     // }).join("");
    
//     // }



