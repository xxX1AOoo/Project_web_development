//The different div elements are selected in turn to be shown and the others are hidden.
//game card 1
function selectGame1(){
    document.getElementById("game1").style.display = "block";
    document.getElementById("game2").style.display = "none";
    document.getElementById("game3").style.display = "none";
    document.getElementById("game4").style.display = "none";
}
//game card 2
function selectGame2(){
    document.getElementById("game1").style.display = "none";
    document.getElementById("game2").style.display = "block";
    document.getElementById("game3").style.display = "none";
    document.getElementById("game4").style.display = "none";
}
//game card 3
function selectGame3(){
    document.getElementById("game1").style.display = "none";
    document.getElementById("game2").style.display = "none";
    document.getElementById("game3").style.display = "block";
    document.getElementById("game4").style.display = "none";
}
//game card 4
function selectGame4(){
    document.getElementById("game1").style.display = "none";
    document.getElementById("game2").style.display = "none";
    document.getElementById("game3").style.display = "none";
    document.getElementById("game4").style.display = "block";
}


function test1() {
    //Reading data from the text boxes
    let familyName = document.getElementById("familyName").value;
    let email = document.getElementById("emailAddress").value;
    let comment = document.getElementById("comment").value;
 
    if(familyName.length == 0){
        //Determine whether family name is empty
        alert("Please fill your family name");
    } else if(email.length == 0){
        //Determining whether email is empty
        alert("please fill your email");
    } else if(email.indexOf("@") == -1 ){
        //Determine whether the email format is correct (contains @ or not)
        alert("Please enter the correct email format (must including '@')")
    } else if(comment.length == 0){
        //Determine whether comment is empty
        alert("Your comment is null")
    } else {
        alert("sumbite sucessfully");
    }
}

function deleteText() {
    //Set the value of each text box to empty
    document.getElementById("familyName").value = "";
    document.getElementById("givenName").value = "";
    document.getElementById("emailAddress").value = "";
    document.getElementById("mobileNumber").value = "";
    document.getElementById("comment").value = "";
}

//Set a switch to initialise to false
var showMenuFlag = false;
function openMenu() {
    //Each call to this function will set the 'not' value of showMenuflag
    showMenuFlag = !showMenuFlag;
    if(showMenuFlag) {
        //Display menu bar(block), close other div elements
        document.getElementsByClassName("logo")[0].style.display = "none";
        document.getElementsByClassName("pageContainer")[0].style.display = "none";
        document.getElementsByClassName("homemenu")[0].style.display = "block";
    } else {
        //Close menu bar, display other div elements
        document.getElementsByClassName("logo")[0].style.display = "block";
        document.getElementsByClassName("pageContainer")[0].style.display = "block";
        document.getElementsByClassName("homemenu")[0].style.display = "none";
    }
}

//https://codepen.io/timothyguo/pen/KdzJrY
//Loading page
function loading(){
    // Enter the page load three seconds
    setTimeout(showPage, 3000);
}

function showPage(){
    // Display loading page
    document.getElementById("loadPage").style.display = "none";
    document.getElementsByClassName("pageContainer")[0].style.display = "block";
    document.getElementsByClassName("headercontainer")[0].style.display = "block";
    document.body.style.backgroundColor = "white";
}


//https://www.bilibili.com/video/BV13a411Y7D4?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click
// Get the ul element and append a set of identical images to it (to make it seamless)
let ul = document.querySelector('.movingslides ul');
ul.innerHTML = ul.innerHTML+ul.innerHTML;
// Get all li elements and .btn elements
let lis = document.querySelectorAll('.movingslides li');
let btns = document.querySelectorAll('.btn');
// Span per scroll (default scrolls to the left)
let spa = -2;
// Calculate and set the total width of ul
ul.style.width = lis[0].offsetWidth*lis.length+'px';

// Scrolling functions
function move(){
    if(ul.offsetLeft < -ul.offsetWidth/2){
     //Determine if the picture is finished, restart when finished
        ul.style.left = '0';
    }
    if(ul.offsetLeft > 0){
        // Determine if the picture is finished when walking to the right
        ul.style.left = -ul.offsetWidth/2+'px';
    }
    // Set the offset position
    ul.style.left = ul.offsetLeft+spa+'px';
}

//Timer to execute the move function every 30 milliseconds
let timer = setInterval(move,30);