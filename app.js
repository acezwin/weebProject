const base_url = "https://api.jikan.moe/v3";


function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results
        .sort((a,b)=>a.episodes-b.episodes)            
        .map(anime=>{
            return `
            </div>
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">${anime.title}</span>
                        <p>${anime.synopsis}</p>
                    </div>
                    <div class="card-body">
                        <img src="${anime.image_url}" width ="160" height="240">
                    </div>
                    <div class="card-action">
                        <a href="${anime.url}">Find out more</a>
                        <button class="btn btn-info float-right btn-sm" onclick="addToCart('+item['id']+')">Add to Watchlist</button>
                    </div>
                </div>
            `
        }).join("");
    }

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);

function toShoppingCart(){
    let email =$.trim($('#email').val()); //gets the user's email

    //email validation

    if( email !='' ) {
        sessionStorage.setItem('email', email); //setItem 'email' in sessionStorage to be the user's email. You can access sessionStorage by sessionStorage.getItem().
        window.location.href = './cart.html'; //redirect to the shopping cart page
    } else {
        alert("Please enter your email at top of page."); //alert user since email is empty
    }
}

function addToCart($id) {
    let email =$.trim($('#email').val()); //gets the user's email
    
    if (email != ''){
    sessionStorage.setItem("email", email);
    $.ajax({
        url: Url + 'AddToCart',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify({"anime.title": $id, "email" : email}),
        contentType: 'text/plain',

        success: function (data) { //on success
            //fetchOneProduct($id);
           
            //sessionStorage.productListAdd($id);
            alert("All done"); 

        }, 
        error: function (data){
            alert("Wrong"); 
        }
    });  
    }
    else {
        alert("something wrong here in else");
        
    }      
}

document.getElementById("btnDarkmode").onclick = function Darkmode(){
    //console.log("dark button working")
    document.body.style.backgroundColor = "rgb(32, 33, 36)";
    //document.getElementsByClassName(".card").style.backgroundColor = "rgb(55,57,59)";
    
}
document.getElementById("btnLightmode").onclick = function Lightmode(){
    //console.log("light button working")
    document.body.style.backgroundColor = "rgb(255, 255, 255)";
    //document.getElementsByClassName(".card").style.backgroundColor = "rgb(55,57,59)";
    
}

$('#exampleModal').on('show.bs.modal', function (event) {
    $('#ajaxForm').trigger("reset");
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('#btnSave').off().click(function () {
        setComment(recipient);
    });
});
