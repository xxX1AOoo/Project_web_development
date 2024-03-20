function popison(){
    let turnonpop = document.getElementById("turnonpop");

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            turnonpop.classList.add("popup-on");
            turnonpop.style.zIndex = '9999';
        } else if(req.readyState === 4 && req.status === 401){
            alert('You haved logged in');
        }
    };

    req.open('GET', '/openlogin');
    req.send();
}

function closepopison(){
    let turnonpop = document.getElementById("turnonpop");
    turnonpop.classList.remove("popup-on");
}

function signup_pop(){
    window.location.assign("signup.html");
}

function adminslogin(){
    window.location.assign("admin.html");
}

function login(){
    let logindata = {
        username: document.getElementById("useraccount").value,
        password: document.getElementById("userpassword").value
    };

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            alert('Logged In successfully!');
            closepopison();
        } else if(this.readyState === 4 && this.status === 401){
            alert('Incorrect username or password!');
        }
    };

    req.open('POST', '/login');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(logindata));
}

function signup(){
    let signupdata = {
        username: document.getElementById("signup-user").value,
        password: document.getElementById("signup-pass").value,
        first: document.getElementById("signup-first").value,
        last: document.getElementById("signup-last").value,
        email: document.getElementById("signup-email").value
    };

    if(document.getElementById('signup-pass').value !== document.getElementById('signup-confirm').value){
        alert('Passwords do not match!');
        return;
    }

    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            alert('Signed Up successfully!');
            window.location.assign('index.html');
        } else if(req.readyState === 4 && req.status === 401){
            alert('Signed Up FAILED!');
        }
    };

    req.open('POST', '/signup');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(signupdata));
}

function logout(){
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            alert('Logged Out');
            window.location.assign('index.html');
        } else if(req.readyState === 4 && req.status === 403){
            alert('ERROR');
        }
    };

    req.open('POST', '/logout');
    req.send();
}

// click img head on menu bar
function toUser() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            window.location.assign('user.html');
        } else if(req.readyState === 4 && req.status === 403){
            alert('NOT Logged in');
        }
    };

    // '/users'
    req.open('GET', '/users');
    req.send();
}


function google_go(response){

    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            alert('Logged In with Google successfully!');
            closepopison();
        } else if(req.readyState === 4 && req.status === 401){
            alert('Login FAILED!');
        }
    };
    req.open('POST', '/login');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(response));

}
