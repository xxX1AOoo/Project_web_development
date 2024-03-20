/* render user info */
function userInfo() {
    /*
    <img src="images/cat_profile.jpeg" alt="Profile Picture" id="profile_img"
    class="profile_picture">
    <div class="profile_info">
        <h3 class="profile_info">Demo Name</h3>
        <p class="profile_info">Email: DemoName@example.com</p>
    </div>
    */
    let avatar = document.createElement('IMG');
    let info_div = document.createElement('DIV');
    let name = document.createElement('H3');
    let email = document.createElement('P');

    avatar.setAttribute('id', 'profile_img');
    avatar.alt = 'avatar';

    avatar.classList.add('profile_picture');
    info_div.classList.add('profile_info');
    name.classList.add('profile_info');
    email.classList.add('profile_info');

    info_div.appendChild(name);
    info_div.appendChild(email);

    document.getElementById('user-info').appendChild(avatar);
    document.getElementById('user-info').appendChild(info_div);

    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let userdata = JSON.parse(req.responseText);
            for(let user of userdata){
                avatar.src = user.avatar;
                name.innerText = user.first_name + " " + user.last_name;
                email.innerText = "Email: " + user.email;
            }
        }
    };
    req.open('GET', '/users');
    req.send();
}

function userClubs() {
    /*
    <ul class="clubs_info" id="clubs-ul">
        <li>
            <h3>Fitness Club</h3>
        </li>
    </ul>
     */
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let clubdata = JSON.parse(req.responseText);
            console.log(clubdata);
            for(let club of clubdata){
                let club_li = document.createElement('LI');
                let club_name = document.createElement('H3');

                club_li.appendChild(club_name);
                document.getElementById("clubs-ul").appendChild(club_li);


                club_name.innerText = club.club_name;
            }
        }
    };

    req.open('GET', '/users/clubs-info');
    req.send();
}

function userPosts() {
    /*
    <ul class="clubs_info" id="posts-ul">
        <li>
            <h3>title</h3>
            <p>contents</p>
            <p>by Fitness Club</p>
        </li>
    </ul>
     */
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let postdata = JSON.parse(req.responseText);
            for(let post of postdata){
                let post_li = document.createElement('LI');
                let post_title = document.createElement('H3');
                let post_content = document.createElement('P');
                let post_club = document.createElement('P');

                post_li.appendChild(post_title);
                post_li.appendChild(post_content);
                post_li.appendChild(post_club);
                document.getElementById("posts-ul").appendChild(post_li);

                post_club.innerText = 'By ' + post.club_name;

                post_title.innerText = post.post_title;
                post_content.innerText = post.post_content;
            }
        }
    };

    req.open('GET', '/users/members/posts.json');
    req.send();
}



// ////////////////////////////
// Update Information
function updateInfo() {
    /*
    <h1>Update Information</h1>
    <form>
        <label for="fname"; class="required">First Name:</label>
        <input type="text" id="fname" name="fname" required><br><br>

        <label for="lname" class="required">Last Name:</label>
        <input type="text" id="lname" name="lname" required><br><br>

        <label for="email" class="required">Email Address:</label>
        <input type="email" id="email" name="email" required><br><br>

        <p>Confirm your password to update:</p>
        <label for="password" class="required">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <input type="submit" value="Update">
    </form>
    */
    let updatedata = {
        first_name: document.getElementById('fname').value,
        last_name: document.getElementById('lname').value,
        email: document.getElementById('email').value
    };

    let req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200){
            alert('Updated successfully!');
        } else if (req.readyState === 4 && req.status === 400){
            alert('Update FAILED');
        }
    };

    req.open('POST', '/users/update');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(updatedata));
}

function renderUpdateInfo() {
    let data = `<h1>Update Information</h1>
    <form>
        <label for="fname"; class="required">First Name:</label>
        <input type="text" id="fname" name="fname" required><br><br>

        <label for="lname" class="required">Last Name:</label>
        <input type="text" id="lname" name="lname" required><br><br>

        <label for="email" class="required">Email Address:</label>
        <input type="email" id="email" name="email" required><br><br>

        <input type="submit" value="Update" onclick=updateInfo()>
    </form>`;

    document.getElementById('right').innerHTML = data;
}

// ////////////////////////////

function renderUpdateAvatar() {
    let data = `
    <h1>Update Avatar</h1>
    <form action="/users/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar">
        <input type="submit">
    </form>
    `;

    document.getElementById('right').innerHTML = data;
}

// ///////////////////////

function renderRSVPpage() {
    let data = `
    <div id="checkRSVP-div">
        <h1 id="RSVP">RSVP</h1>
    </div>
    <div id="attended-div">
        <h1>Attended</h1>
    </div>`;
    document.getElementById('right').innerHTML = data;
}


function renderRSVP() {
    /*
    <div class="rsvp">
        <p>We are excited to invite you to our upcoming event, [event name].
        Please take a moment to RSVP and let us know if you will be able to attend.
        Your presence and participation are important to us.</p>
        <p>Time: 6PM 20/05/2023</p>
        <p>LOCATION: Fitness Center</p>
        <p>By xxx Club</p>
        <button type=button onclick=attend()>Attend</button>
    <div>
    */
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let rsvpdata = JSON.parse(req.responseText);

            console.log(rsvpdata);
            for(let rsvp of rsvpdata){
                if(!rsvp.is_attending){
                    let rsvp_div = document.createElement('DIV');
                    let rsvp_content = document.createElement('P');
                    let rsvp_br = document.createElement('BR');
                    let rsvp_event_name = document.createElement('P');
                    let rsvp_time = document.createElement('P');
                    let rsvp_location = document.createElement('P');
                    let rsvp_more = document.createElement('P');

                    let rsvp_button = document.createElement('BUTTON');

                    rsvp_div.classList.add('rsvp');

                    rsvp_div.appendChild(rsvp_content);
                    rsvp_div.appendChild(rsvp_br);
                    rsvp_div.appendChild(rsvp_event_name);
                    rsvp_div.appendChild(rsvp_time);
                    rsvp_div.appendChild(rsvp_location);
                    rsvp_div.appendChild(rsvp_more);
                    rsvp_div.appendChild(rsvp_button);
                    rsvp_content.innerText = `We are excited to invite you to our upcoming event.
                    Please take a moment to RSVP and let us know if you will be able to attend.
                    Your presence and participation are important to us.
                    `;
                    rsvp_event_name.innerText = 'Event: ' + rsvp.event_name;
                    rsvp_time.innerText = 'Time: ' + rsvp.time;
                    rsvp_location.innerText = 'Location: ' + rsvp.location;
                    rsvp_more.innerText = 'FROM ' + rsvp.club_name;

                    rsvp_button.innerText = 'Attend';
                    rsvp_button.setAttribute('type', 'button');
                    rsvp_button.onclick = function attend() {
                        let attenddata = {
                            is_attending: true,
                            event_id: rsvp.event_id,
                            club_id: rsvp.club_id
                         };
                        let req1 = new XMLHttpRequest();

                        req1.onreadystatechange = function() {
                            if(this.readyState === 4 && this.status === 200){
                                alert('Attend successfully!');
                            }
                        };

                        req1.open('POST', '/users/attend');
                        req1.setRequestHeader('Content-Type', 'application/json');
                        req1.send(JSON.stringify(attenddata));
                    };
                    document.getElementById("checkRSVP-div").appendChild(rsvp_div);

                } else if (rsvp.is_attending) {
                    let rsvp_div = document.createElement('DIV');
                    rsvp_div.classList.add('rsvp');
                    let rsvp_content = document.createElement('P');
                    rsvp_div.appendChild(rsvp_content);
                    rsvp_content.innerText = 'You have attended event [' + rsvp.event_name + ']';
                    let rsvp_more = document.createElement('P');
                    rsvp_div.appendChild(rsvp_more);
                    document.getElementById("attended-div").appendChild(rsvp_div);
                }
            }
        }
    };

    req.open('GET', '/users/rsvp.json');
    req.send();
}

function renderAdminLi() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let admindata = JSON.parse(this.responseText);
            console.log(admindata);
            /*
            <li class="user_link" style="cursor: pointer;" onclick="toAdmin()">Admin System</li>
            */
            if(admindata[0].is_admin === 1){
                let admin_li = document.createElement('LI');
                admin_li.classList.add("user_link");
                admin_li.style.cursor = "pointer";
                admin_li.innerText = 'Admin System';
                admin_li.setAttribute("onclick", "toAdmin()");
                document.getElementById("user-menu").appendChild(admin_li);
            }
        }
    };
    req.open('GET', '/users/to-admin');
    req.send();
}

function toAdmin() {
    window.location.assign("admin_profile.html");
}
